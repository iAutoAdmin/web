/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['test', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} pone
 * @returns {Boolean}
 */
export function isPoneTelAvailable(pone) {
  const MYREG_PONE = /^[1][3,4,5,7,8][0-9]{9}$/
  const MYREG_TEL = /^0\d{2,3}-?\d{7,8}$/
  return MYREG_PONE.test(pone) || MYREG_TEL.test(pone)
}

