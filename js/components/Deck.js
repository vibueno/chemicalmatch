/**
 * @module Deck
 */

import { CARD_FIGURES } from '../constants.js';
import { functions } from '../functions.js';

import { Card } from './Card.js';

/**
 * @constructor
 * @description Creates a new Deck object
 *
 * @param {Number}     deckSize      number of cards of the deck.
 *
 * @property {Number}  deckSize      number of cards of the deck.
 * @property {Array}   cards         card objects included the deck.
 * @property {Object}  DOMNode       DOM object related to the deck.
 */
let Deck = function(deckSize) {
  if (deckSize / 2 > CARD_FIGURES.length)
    throw `There are not enough figures for a deck of size ${deckSize}.`;

  this.deckSize = deckSize;
  this.cards = [];
  this.DOMNode = document.getElementsByClassName('deck')[0];
  this.DOMNode.innerHTML = '';

  this.addCards();
  this.shuffleCards();
  this.setUpDOMCards();
};

/**
 * @description Adds cards to the deck.
 */
Deck.prototype.addCards = function() {
  /* In case there are more figures than needed, this shuffle call makes the game more insteresting
  since every time the figures shown will be different */
  functions.shuffle(CARD_FIGURES);

  //Adding array of cards
  for (let i = 0; i <= this.deckSize - 1; i++) {
    //We add the same figure twice
    this.cards[i] = new Card(i, 'fa-' + CARD_FIGURES[Math.floor(i / 2)]);
  }
};

/**
 * @description Shuffles the cards in the deck.
 */
Deck.prototype.shuffleCards = function() {
  functions.shuffle(this.cards);
};

/**
 * @description Adds cards to the DOM.
 *
 * @returns {Object} Promise
 */
Deck.prototype.addCardstoDOM = function() {
  return new Promise(resolve => {
    this.cards.forEach(card => {
      let cardHTML = `<li id="card-${card.id}" class="card"><i class="fas ${card.figure}"></i></li>`;
      this.DOMNode.innerHTML += cardHTML;
    });
    resolve('Cards added');
  });
};

/**
 * @description Adds DOM Nodes to the cards.
 */
Deck.prototype.addDOMNodetoCards = function() {
  this.cards.forEach(card => {
    card.DOMNode = document.getElementById(`card-${card.id}`);
  });
};

/**
 * @description Sets up everything between the cards and the DOM.
 */
Deck.prototype.setUpDOMCards = async function() {
  await this.addCardstoDOM();
  this.addDOMNodetoCards();
};

export { Deck };
