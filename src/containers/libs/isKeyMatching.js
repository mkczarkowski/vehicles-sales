/* eslint-disable import/prefer-default-export */

/**
 *  Composable function used to filter rowData for row given fieldName that match provided value
 * @param {string} key - object's key which value will be matched with value param
 * @param {string} val - value to be matched
 * @param {object} object - object containing given key
 */
export const isKeyMatching = key => val => obj =>
  obj[key].toLowerCase() === val.toLowerCase();
