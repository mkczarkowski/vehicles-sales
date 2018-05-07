/* eslint-disable import/prefer-default-export */

export function mapKeysAsSelectOptions(obj) {
  /* Returns object's keys in html select's option format */
  return Object.keys(obj).map(key => ({ label: key, value: key }));
}