/**
  * @module classes
  */

import { functions } from './functions.js';
import { CARD_FIGURES, DECK_SIZE, PERF_COMMENTS } from './constants.js';

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
	this.DOMNodeTimer.innerHTML = `Time: ${functions.formatMinutes(seconds)}:${functions.formatSeconds(seconds)}`;
};

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

	if (deckSize / 2 > CARD_FIGURES.length) throw `There are not enough figures for a deck of size ${deckSize}.`;

	this.deckSize = deckSize;
	this.cards = [];
	this.DOMNode = document.getElementsByClassName('deck')[0];
	this.DOMNode.innerHTML ='';

	this.addCards();
	this.shuffleCards();
	this.setUpDOMCards();
};

/**
 * @description Adds cards to the deck.
 */
Deck.prototype.addCards = function() {

	/**
	 * In case there are more figures than needed, this shuffle call makes the game more insteresting
	 * since every time the figures shown will be different
	 */
	functions.shuffle (CARD_FIGURES);

	//Adding array of cards
	for (let i=0;i<=(this.deckSize)-1;i++) {
		//We add the same figure twice
		this.cards[i] = new Card(i, 'fa-'+CARD_FIGURES[Math.floor(i/2)]);
	}
};

/**
 * @description Shuffles the cards in the deck.
 */
Deck.prototype.shuffleCards = function () {
	functions.shuffle(this.cards);
};

/**
 * @description Adds cards to the DOM.
 *
 * @returns {Object} Promise
 */
Deck.prototype.addCardstoDOM = function () {

	return new Promise((resolve) => {
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
Deck.prototype.addDOMNodetoCards = function () {
	this.cards.forEach(card => {
		card.DOMNode = document.getElementById(`card-${card.id}`);
	});
};

/**
 * @description Sets up everything between the cards and the DOM.
 */
Deck.prototype.setUpDOMCards = async function () {
	await this.addCardstoDOM();
	this.addDOMNodetoCards();
};

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
	this.started=false;
};

/**
 * @description Starts the game.
 */
Game.prototype.start = function() {
	this.started=true;
	this.timer.start();
};

/**
 * @description Ends the game.
 */
Game.prototype.end = function() {
	this.started=false;
	this.timer.stop();
};

/**
 * @description Tells whether the user has already clicked on 2 cards
 *
 * @returns: {Boolean}
 */
Game.prototype.isRoundComplete = function () {
	let cardsinCurrentRound = this.deck.cards.filter(card => card.inCurrentRound === true);
	return (cardsinCurrentRound.length===2? true: false);
};

/**
 * @description Checks the current round.
 */
Game.prototype.checkRound = async function () {
	let currentRoundCards = this.deck.cards.filter(card => card.inCurrentRound === true);

	this.moveCounter.increment();

	//If there is a match
	if (currentRoundCards[0].figure === currentRoundCards[1].figure) {

		currentRoundCards.forEach(function(card){
			card.solved=true;
			card.DOMNode.classList.add('match-trans');
		});

		await functions.sleep(1500);

		currentRoundCards.forEach(function(card) {
			card.DOMNode.classList.remove('match-trans');
			card.DOMNode.classList.add('match');
		});

	}
	else
	{
		await functions.sleep(700);
		currentRoundCards[0].flipBack();
		currentRoundCards[1].flipBack();
	}

	currentRoundCards[0].inCurrentRound=false;
	currentRoundCards[1].inCurrentRound=false;

	this.roundComplete = false;
};

/**
 * @description Tells whether the game has been solved.
 *
 * @returns: {Boolean}
 */
Game.prototype.isGameSolved = function () {
	let notSolvedCards = this.deck.cards.filter(card => card.solved === false);

	if (notSolvedCards.length === 0){
		return true;
	}
	else
	{
		return false;
	}
};

/**
 * @description Returns a comment based on game performance.
 *
 * @returns: {String} Performance comment.
 */
Game.prototype.getPerformanceComment = function () {

	let comments = '';

	if (this.timer.seconds > 60) comments = PERF_COMMENTS.slow;
	else if (this.moveCounter.moves<12) comments = PERF_COMMENTS.astonishing;
	else if (this.moveCounter.moves<14) comments = PERF_COMMENTS.excellent;
	else if (this.moveCounter.moves<16) comments = PERF_COMMENTS.good;
	else if (this.moveCounter.moves<18) comments = PERF_COMMENTS.OK;
	else if (this.moveCounter.moves<19) comments = PERF_COMMENTS.bad;
	else if (this.moveCounter.moves>=20) comments = PERF_COMMENTS.verybad;

	//Returning random comment
	return comments[Math.floor(Math.random() * comments.length)];
};

/**
 * @constructor
 * @description Creates a new Modal object
 *
 * @property {Object}  DOMNode          DOM object related to the modal.
 * @property {Object}  DOMNodeModalText DOM object related to the modal text.
 * @property {Object}  DOMNodeCloseBtn  DOM object related to the modal close button.
 * @property {Object}  DOMNodeAnswerBts DOM object related to the modal answer buttons.
 * @property {Object}  opened           tells whether the modal is open
 */
let Modal = function() {
	this.ModalId = null;
	this.DOMNode = document.getElementById('modal');
	this.DOMNodeText = document.getElementById('modal-text');
	this.DOMNodeClose = document.getElementById('modal-close');
	this.DOMNodeButtons = document.getElementById('modal-buttons');
	this.opened = false;
};

/**
 * @description Show/hides the modal.
 *
 * @param {Boolean} show Indicates whether to show or hide the modal.
 */
Modal.prototype.setVisibility = function (show) {
	if (show) {
		this.DOMNode.classList.add('show');
	  this.DOMNode.classList.remove('hidden');
	  this.opened = true;
	}
	else {
		this.DOMNode.classList.add('hidden');
	  this.DOMNode.classList.remove('show');
	  this.opened = false;
	}
};

/**
 * @description Sets dialog text.
 *
 * @param {String} text text to be shown on the modal.
 */
Modal.prototype.setText = function (text) {
	this.DOMNodeText.innerHTML = text;
};

/**
 * @description Opens the modal.
 *
 * @param {String} text      text to be shown on the modal.
 * @param {String} modalType indicates the type of modal to be shown.
 * @param {Number} Id        identifies the exact message being shown.
 */
Modal.prototype.open = function (text, modalType, Id) {

	this.Id = Id;

	switch(modalType) {
	  case 'info':
			this.DOMNodeButtons.classList.add('modal-buttons-hidden');
			this.DOMNodeButtons.classList.remove('modal-buttons');
	    break;
	  case 'question':
			this.DOMNodeButtons.classList.add('modal-buttons');
			this.DOMNodeButtons.classList.remove('modal-buttons-hidden');
	    break;
	}

	this.setText(text);
	this.opened=true;
	this.setVisibility(true);
};

/**
 * @description Closes the modal.
 *
 */
Modal.prototype.close = function () {
	this.setVisibility(false);
};

export { Deck, Game, Modal };