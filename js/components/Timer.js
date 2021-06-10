/**
 * @module Timer
 */

import { functions } from '../functions.js';

/**
 * @constructor
 * @description Creates a new timer object.
 *
 * @property {Number} seconds seconds passed since the timer started
 * @property {Object} DOMNode DOM object related to the timer.
 */
let Timer = function() {
  //https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
  this.seconds = 0;
  this.DOMNodeTimer = document.getElementById('timer');
  this.setDOMValue(this.seconds);
};

/**
 * @description Starts the timer.
 */
Timer.prototype.start = function() {
  //We need to bind this, in order to not to lose its value due to
  //the use of setInterval
  this.intervalId = setInterval(this.update.bind(this), 1000);
};

/**
 * @description Stops the timer.
 */
Timer.prototype.stop = function() {
  clearInterval(this.intervalId);
};

/**
 * @description Updates the timer.
 */
Timer.prototype.update = function() {
  this.seconds++;
  this.setDOMValue(this.seconds);
};

/**
 * @description Resets the timer.
 */
Timer.prototype.reset = function() {
  this.stop();
  this.seconds = 0;
  this.setDOMValue(this.seconds);
};

/**
 * @description Sets timer value in the DOM.
 *
 * @param {Number} seconds amount of seconds the game has been played.
 */
Timer.prototype.setDOMValue = function(seconds) {
  this.DOMNodeTimer.innerHTML = `Time: ${functions.formatMinutes(
    seconds
  )}:${functions.formatSeconds(seconds)}`;
};

export { Timer };
