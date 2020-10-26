/**
 * @module Card
 */

/**
 * @constructor
 * @description Creates a new Card object.
 *
 * @param  {Number} id identifier of the card.
 * @param  {String} figure shown on the card.
 *
 * @property {Number}  id             identifier of the card.
 * @property {String}  figure         font-awesome icon assigned to the card.
 * @property {Boolean} solved         tells whether the card has been solved.
 * @property {Boolean} inCurrentRound tells whether the card is being used in the current round.
 * @property {Object}  DOMNode        DOM object related to the card.
 */
let Card = function(id, figure) {
  this.id = id;
  this.figure = figure;
  this.solved = false;
  this.inCurrentRound = false;
  this.DOMNode = null;
};

/**
 * @description Flips the card.
 */
Card.prototype.flip = function () {

  if (this.solved===false) {
    this.DOMNode.classList.add('flipped');
    this.inCurrentRound = true;
  }
};

/**
 * @description Flips the card back.
 */
Card.prototype.flipBack = function () {
  if (this.solved===false) {
    this.DOMNode.classList.remove ('flipped');
    this.inCurrentRound = false;
  }
};

export { Card };