/*
 * Some very basic functions that the entire project may need.
 */

/**
 * Test if the given array has an object that has a "value" property of the given value
 * @param {Array} arr The array. A property named "value" is expected for each element
 * @param {*} val The value of the "value" property to be matched
 * @returns {boolean} The result
 */
function hasValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value === val) {
      return true;
    }
  }
  return false;
}

/**
 * Get the object that has a "value" property of the given value from an array
 * 
 * @param {Array} arr The array containing many of such objects
 * @param {*} val The value of the "value" property to be matched
 * @returns {*} If such object exists in the array, returns it, or else returns undefined
 */
function getObjFromValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value === val) {
      return arr[i];
    }
  }
  return undefined;
}

/**
 * Test a if a string is a symbol (length === 1 and [0-9a-zA-Z])
 * @param {string} char The string that is tested
 */
function is_symbol(char) {
  return (char.length === 1
    && ((char >= '0' && char <= '9')
     || (char >= 'a' && char <= 'z')
     || (char >= 'A' && char <= 'Z')));
}
