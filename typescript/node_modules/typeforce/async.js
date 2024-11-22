var typeforce = require('./')

// async wrapper
function tfAsync (type, value, strict, callback) {
  // default to falsy strict if using shorthand overload
  if (typeof strict === 'function') return tfAsync(type, value, false, strict)

  try {
    typeforce(type, value, strict)
  } catch (e) {
    return callback(e)
  }

  callback()
}

module.exports = Object.assign(tfAsync, typeforce)
