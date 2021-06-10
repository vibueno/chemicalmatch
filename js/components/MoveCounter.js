/**
 * @module MoveCounter
 */

/**
 * @constructor
 * @description Creates a new move counter object.
 *
 * @property {Number} moves   stores the number of moves performed in the current game.
 * @property {Object} DOMNode DOM object related to the counter.
 */
let MoveCounter = function() {
  this.moves = 0;
  this.DOMNode = document.getElementById('moves');
  this.setDOMValue();
};

/**
 * @description Resets the counter.
 */
MoveCounter.prototype.reset = function() {
  this.moves = 0;
  this.setDOMValue();
};

/**
 * @description Increments the counter.
 */
MoveCounter.prototype.increment = function() {
  this.moves++;
  this.setDOMValue();
};

/**
 * @description Sets moves value in the DOM.
 */
MoveCounter.prototype.setDOMValue = function() {
  this.DOMNode.textContent = `Moves: ${this.moves}`;
};

export { MoveCounter };
