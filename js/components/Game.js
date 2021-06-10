/**
 * @module Game
 */

import { CARD_FIGURES, DECK_SIZE, PERF_COMMENTS } from '../constants.js';
import { functions } from '../functions.js';

import { MoveCounter } from './MoveCounter.js';
import { Timer } from './Timer.js';
import { Deck } from './Deck.js';

/**
 * Creates a new Game object
 * @class
 *
 * @property {Object}  moveCounter   game move counter
 * @property {Object}  timer         game timer
 * @property {Boolean} roundComplete tells whether two cards have been flipped in the current round.
 * @property {Object}  deck          game deck object
 * @property {Boolean} started       tells whether the game is on-going
 */
let Game = function() {
  this.moveCounter = new MoveCounter();
  this.timer = new Timer();
  this.roundComplete = false;
  this.deck = new Deck(DECK_SIZE);
  this.started = false;
};

/**
 * @description Resets the game.
 */
Game.prototype.reset = function() {
  this.deck = new Deck(DECK_SIZE);
  this.moveCounter.reset();
  this.timer.reset();
  this.started = false;
};

/**
 * @description Starts the game.
 */
Game.prototype.start = function() {
  this.started = true;
  this.timer.start();
};

/**
 * @description Ends the game.
 */
Game.prototype.end = function() {
  this.started = false;
  this.timer.stop();
};

/**
 * @description Tells whether the user has already clicked on 2 cards
 *
 * @returns: {Boolean}
 */
Game.prototype.isRoundComplete = function() {
  let cardsinCurrentRound = this.deck.cards.filter(
    card => card.inCurrentRound === true
  );
  return cardsinCurrentRound.length === 2 ? true : false;
};

/**
 * @description Checks the current round.
 */
Game.prototype.checkRound = async function() {
  let currentRoundCards = this.deck.cards.filter(
    card => card.inCurrentRound === true
  );

  this.moveCounter.increment();

  //If there is a match
  if (currentRoundCards[0].figure === currentRoundCards[1].figure) {
    currentRoundCards.forEach(function(card) {
      card.solved = true;
      card.DOMNode.classList.add('match-trans');
    });

    await functions.sleep(1500);

    currentRoundCards.forEach(function(card) {
      card.DOMNode.classList.remove('match-trans');
      card.DOMNode.classList.add('match');
    });
  } else {
    await functions.sleep(700);
    currentRoundCards[0].flipBack();
    currentRoundCards[1].flipBack();
  }

  currentRoundCards[0].inCurrentRound = false;
  currentRoundCards[1].inCurrentRound = false;

  this.roundComplete = false;
};

/**
 * @description Tells whether the game has been solved.
 *
 * @returns: {Boolean}
 */
Game.prototype.isGameSolved = function() {
  let notSolvedCards = this.deck.cards.filter(card => card.solved === false);

  if (notSolvedCards.length === 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * @description Returns a comment based on game performance.
 *
 * @returns: {String} Performance comment.
 */
Game.prototype.getPerformanceComment = function() {
  let comments = '';

  if (this.timer.seconds > 60) comments = PERF_COMMENTS.slow;
  else if (this.moveCounter.moves < 12) comments = PERF_COMMENTS.astonishing;
  else if (this.moveCounter.moves < 14) comments = PERF_COMMENTS.excellent;
  else if (this.moveCounter.moves < 16) comments = PERF_COMMENTS.good;
  else if (this.moveCounter.moves < 18) comments = PERF_COMMENTS.OK;
  else if (this.moveCounter.moves < 20) comments = PERF_COMMENTS.bad;
  else if (this.moveCounter.moves >= 20) comments = PERF_COMMENTS.verybad;

  //Returning random comment
  return comments[Math.floor(Math.random() * comments.length)];
};

export { Game };
