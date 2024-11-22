'use strict';

var Buffer = require('safe-buffer').Buffer;
var Transform = require('stream').Transform;
var StringDecoder = require('string_decoder').StringDecoder;
var inherits = require('inherits');

function CipherBase(hashMode) {
	Transform.call(this);
	this.hashMode = typeof hashMode === 'string';
	if (this.hashMode) {
		this[hashMode] = this._finalOrDigest;
	} else {
		this['final'] = this._finalOrDigest;
	}
	if (this._final) {
		this.__final = this._final;
		this._final = null;
	}
	this._decoder = null;
	this._encoding = null;
}
inherits(CipherBase, Transform);

var useUint8Array = typeof Uint8Array !== 'undefined';
var useArrayBuffer = typeof ArrayBuffer !== 'undefined'
	&& typeof Uint8Array !== 'undefined'
	&& ArrayBuffer.isView
	&& (Buffer.prototype instanceof Uint8Array || Buffer.TYPED_ARRAY_SUPPORT);

CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
	var bufferData;
	if (data instanceof Buffer) {
		// No need to do anything
		bufferData = data;
	} else if (typeof data === 'string') {
		// Convert strings to Buffer
		bufferData = Buffer.from(data, inputEnc);
	} else if (useArrayBuffer && ArrayBuffer.isView(data)) {
		/*
		 * Wrap any TypedArray instances and DataViews
		 * Makes sense only on engines with full TypedArray support -- let Buffer detect that
		 */
		bufferData = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
	} else if (useUint8Array && data instanceof Uint8Array) {
		/*
		 * Uint8Array in engines where Buffer.from might not work with ArrayBuffer, just copy over
		 * Doesn't make sense with other TypedArray instances
		 */
		bufferData = Buffer.from(data);
	} else if (
		Buffer.isBuffer(data)
		&& data.constructor
		&& data.constructor.isBuffer
		&& data.constructor.isBuffer(data)
	) {
		/*
		 * Old Buffer polyfill on an engine that doesn't have TypedArray support
		 * Also, this is from a different Buffer polyfill implementation then we have, as instanceof check failed
		 * Convert to our current Buffer implementation
		 */
		bufferData = Buffer.from(data);
	} else {
		throw new Error('The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView.');
	}

	var outData = this._update(bufferData);
	if (this.hashMode) {
		return this;
	}

	if (outputEnc) {
		outData = this._toString(outData, outputEnc);
	}

	return outData;
};

CipherBase.prototype.setAutoPadding = function () {};
CipherBase.prototype.getAuthTag = function () {
	throw new Error('trying to get auth tag in unsupported state');
};

CipherBase.prototype.setAuthTag = function () {
	throw new Error('trying to set auth tag in unsupported state');
};

CipherBase.prototype.setAAD = function () {
	throw new Error('trying to set aad in unsupported state');
};

CipherBase.prototype._transform = function (data, _, next) {
	var err;
	try {
		if (this.hashMode) {
			this._update(data);
		} else {
			this.push(this._update(data));
		}
	} catch (e) {
		err = e;
	} finally {
		next(err);
	}
};
CipherBase.prototype._flush = function (done) {
	var err;
	try {
		this.push(this.__final());
	} catch (e) {
		err = e;
	}

	done(err);
};
CipherBase.prototype._finalOrDigest = function (outputEnc) {
	var outData = this.__final() || Buffer.alloc(0);
	if (outputEnc) {
		outData = this._toString(outData, outputEnc, true);
	}
	return outData;
};

CipherBase.prototype._toString = function (value, enc, fin) {
	if (!this._decoder) {
		this._decoder = new StringDecoder(enc);
		this._encoding = enc;
	}

	if (this._encoding !== enc) {
		throw new Error('can’t switch encodings');
	}

	var out = this._decoder.write(value);
	if (fin) {
		out += this._decoder.end();
	}

	return out;
};

module.exports = CipherBase;
