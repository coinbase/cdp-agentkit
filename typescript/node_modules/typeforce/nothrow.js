var typeforce = require('./')

function tfNoThrow (type, value, strict) {
  try {
    return typeforce(type, value, strict)
  } catch (e) {
    tfNoThrow.error = e
    return false
  }
}

module.exports = Object.assign(tfNoThrow, typeforce)
