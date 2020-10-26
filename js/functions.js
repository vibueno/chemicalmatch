/**
 * @module functions
 */

let functions = {

  /**
   * @description formats amount of seconds to 00.
   * @param  {Number} seconds number of seconds.
   *
   * @returns: {String} formatted seconds
   */
  formatSeconds: function (seconds) {
    return functions.pad(seconds % 60);
  },

  /**
   * @description formats amount of minutes to 00.
   * @param  {Number} seconds number of seconds.
   *
   * @returns: {String} formatted minutes
   */
  formatMinutes: function (seconds) {
    return functions.pad(parseInt(seconds / 60));
  },

  /**
   * @description Pauses execution.
   * @param   {Number} ms amount of miliseconds.
   *
   * @returns {Object} Promise
   */
  sleep: function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * @description Formats number to 00.
   * @param  {Number}   val value to be formatted.
   *
   * @returns: {String} formatted value
   */
  pad: function (val) {
    var valString = val + '';
    if (valString.length < 2) {
      return '0' + valString;
    }
    else {
      return valString;
    }
  },

  /**
   * @description Shuffles an array.
   * @param  {[array]} array array to be shuffled.
   */
  shuffle: function (array) {

    // Shuffle function from http://stackoverflow.com/a/2450976
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }
};

export { functions };