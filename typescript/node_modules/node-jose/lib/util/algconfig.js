/*!
 * util/algconfig.js - Functions for managing algorithm set options
 *
 * Copyright (c) 2015 Cisco Systems, Inc. See LICENSE file.
 */
"use strict";

function quoteRE(str) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

function makeRE(prefix, wildcard, suffix) {
  var parts = [];

  parts.push("^");
  if (prefix) {
    prefix = quoteRE(prefix);
    parts.push(prefix);
  }
  if (wildcard) {
    parts.push((prefix || suffix) ? ".*" : ".+");
  }
  if (suffix) {
    suffix = quoteRE(suffix);
    parts.push(suffix);
  }
  parts.push("$");

  return parts.join("");
}

var AlgConfig = function(algspec) {
  if (!algspec) {
    algspec = [];
  } else if ("string" === typeof algspec) {
    algspec = algspec.split(" ");
  }

  var specAllowed = [], specDisallowed = [];
  var ptnAllowed = [], ptnDisallowed = [];
  var ptn = /^(!)?([^*]*)(\*?)([^*]*)$/, fmt;
  algspec.forEach(function (a) {
    if (!a) { return; }

    ptn.lastIndex = 0;
    var parts = ptn.exec(a);
    if (!parts) { return; }

    fmt = "(" + makeRE(parts[2], parts[3], parts[4]) + ")";
    if (!parts[1]) {
      // allowed pattern
      ptnAllowed.push(fmt);
      specAllowed.push(parts[0]);
    } else {
      // disallowed pattern
      ptnDisallowed.push(fmt);
      specDisallowed.push(parts[0]);
    }
  });

  ptnAllowed = (ptnAllowed.length) ?
            new RegExp(ptnAllowed.join("|")) :
            null;
  ptnDisallowed = (ptnDisallowed.length) ?
               new RegExp(ptnDisallowed.join("|")) :
               null;
  if (!specAllowed.length) {
    specAllowed = ["*"];
  }

  Object.defineProperty(this, "spec", {
    value: specAllowed.join(" ") + " " + specDisallowed.join(" "),
    enumerable: true
  });
  Object.defineProperty(this, "match", {
    value: function(alg) {
      var result = Boolean(alg);

      if (result && ptnAllowed) {
        ptnAllowed.lastIndex = 0;
        result = ptnAllowed.test(alg);
      }
      if (result && ptnDisallowed) {
        ptnDisallowed.lastIndex = 0;
        result = !ptnDisallowed.test(alg);
      }

      return result;
    }
  });
}

module.exports = AlgConfig;
