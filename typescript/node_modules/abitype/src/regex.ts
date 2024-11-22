// TODO: This looks cool. Need to check the performance of `new RegExp` versus defined inline though.
// https://twitter.com/GabrielVergnaud/status/1622906834343366657
export function execTyped<type>(regex: RegExp, string: string) {
  const match = regex.exec(string)
  return match?.groups as type | undefined
}

// `bytes<M>`: binary type of `M` bytes, `0 < M <= 32`
// https://regexr.com/6va55
export const bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/

// `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
// https://regexr.com/6v8hp
export const integerRegex =
  /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/

export const isTupleRegex = /^\(.+?\).*?$/
