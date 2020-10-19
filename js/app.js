/**
 *
 * Constants
 *
 */

/**
 * The size of the array CARD_FIGURES does not really matter, as long as its length equals at least
 * half of the deck size.
 *
 * If the number of card figures in CARD_FIGURES exceeds half of the deck size, the programm will choose
 * the correct amount of figures randomly
 *
 * If there are not enough figures, the deck constructor will throw an error.
 */

const CARD_FIGURES = ['fa-cat', 'fa-bath', 'fa-crow', 'fa-anchor', 'fa-cocktail',
                      'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-couch',
                      'fa-fish', 'fa-hamburger', 'fa-hippo', 'fa-kiwi-bird', 'fa-pepper-hot',
                      'fa-subway', 'fa-swimmer', 'fa-theater-masks', 'fa-toilet-paper', 'fa-yin-yang',
                      'fa-toilet', 'fa-ankh', 'fa-bacterium', 'fa-biohazard','fa-bong',
                      'fa-brain', 'fa-camera-retro', 'fa-carrot', 'fa-moon', 'fa-hand-spock',
                      'fa-frog', 'fa-ghost', 'fa-hiking', 'fa-helicopter', 'fa-hat-wizard',
                      'fa-hotdog', 'fa-dog', 'fa-life-ring', 'fa-chess-rook', 'fa-piggy-bank',
                      'fa-poop', 'fa-quidditch', 'fa-snowman', 'fa-spider', 'fa-user-astronaut',
                      'fa-snowplow', 'fa-user-injured', 'fa-american-sign-language-interpreting', 'fa-baby', 'fa-bug',
                      'fa-cannabis','fa-chess-knight','fa-chess-bishop','fa-chess-pawn','fa-chess-queen'
                     ];
const DECK_SIZE = 16;

const PERF_COMMENTS = {'astonishing': 'Seriously, how the f*** did you do that!?',
											 'excellent': 'You surely will be remembered for this performance!',
											 'good': 'Keep training your brain. You are getting there!',
											 'OK': 'You are starting to have memory leaks!',
											 'bad': 'You should start eating brocoly to improve your memory',
											 'verybad': 'Are you kidding me? Can you even remember your name?',
											 'slow': 'Did you fall asleep!?'};

/**
 * @description Shuffles an array.
 * @param  {[array]} array array to be shuffled.
 */
let shuffle = function (array) {

	// Shuffle function from http://stackoverflow.com/a/2450976
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
};

/**
 *
 * Functions
 *
 */

/**
 * @description Pauses execution.
 * @param   {Number} ms amount of miliseconds.
 *
 * @returns {Object} Promise
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @description Formats number to 00.
 * @param  {Number}   val value to be formatted.
 *
 * @returns: {String} formatted value
 */
function pad(val) {
  var valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  }
  else {
    return valString;
  }
}

/**
 * @description formats amount of seconds to 00.
 * @param  {Number} seconds number of seconds.
 *
 * @returns: {String} formatted seconds
 */
function formatSeconds(seconds) {
	return pad(seconds % 60);
}

/**
 * @description formats amount of minutes to 00.
 * @param  {Number} seconds number of seconds.
 *
 * @returns: {String} formatted minutes
 */
function formatMinutes(seconds) {
	return pad(parseInt(seconds / 60));
}

/**
 * @description Shows/Hides the button New Game.
 *
 * @param  {Boolean} show indicates whether to show or hide the button.
 */
function showNewGameButton(show) {

	const DOM_GAME_NEW = document.getElementById('game-new');

	if (show) {
		DOM_GAME_NEW.classList.add('show');
	  DOM_GAME_NEW.classList.remove('hidden');
	}
	else {
		DOM_GAME_NEW.classList.add('hidden');
	  DOM_GAME_NEW.classList.remove('show');
	}
}

/**
 * @description Shows/Hides the button Restart Game.
 *
 * @param  {Boolean} show indicates whether to show or hide the button.
 */
function showRestartGameButton(show) {

	const DOM_GAME_RESTART = document.getElementById('game-restart');

	if (show) {
		DOM_GAME_RESTART.classList.add('show');
	  DOM_GAME_RESTART.classList.remove('hidden');
	}
	else {
		DOM_GAME_RESTART.classList.add('hidden');
	  DOM_GAME_RESTART.classList.remove('show');
	}
}

/**
 * @description Shows/Hides the Game buttons.
 *
 * @param  {Boolean} gameStarted indicates whether there is an on-going game.
 */
function manageButtonsVisibility(gameStarted) {
	if (gameStarted){
		showNewGameButton(false);
		showRestartGameButton(true);
	}
	else {
		showNewGameButton(true);
		showRestartGameButton(false);
	}
}

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
	this.DOMNodeTimer.innerHTML = `Time: ${formatMinutes(seconds)}:${formatSeconds(seconds)}`;
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
	shuffle (CARD_FIGURES);

	//Adding array of cards
	for (let i=0;i<=(this.deckSize)-1;i++) {
		//We add the same figure twice
		this.cards[i] = new Card(i, CARD_FIGURES[Math.floor(i/2)]);
	}
};

/**
 * @description Shuffles the cards in the deck.
 */
Deck.prototype.shuffleCards = function () {
	shuffle(this.cards);
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
 * @description Counts the number of cards included in the current round.
 *
 * @returns: {Number} number of cards included in the current round.
 */
Game.prototype.getCurrentRoundCardCount = function () {
	return this.deck.cards.filter(card => card.inCurrentRound === true).length;
};

/**
 * @description Solves the current round.
 */
Game.prototype.solveRound = async function () {
	let currentRoundCards = this.deck.cards.filter(card => card.inCurrentRound === true);

	this.moveCounter.increment();

	//If there is a match
	if (currentRoundCards[0].figure === currentRoundCards[1].figure) {

		currentRoundCards.forEach(function(card){
			card.solved=true;
			card.DOMNode.classList.add('match-trans');
		});

		await sleep(1500);

		currentRoundCards.forEach(function(card) {
			card.DOMNode.classList.remove('match-trans');
			card.DOMNode.classList.add('match');
		});

	}
	else
	{
		await sleep(700);
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
Game.prototype.isSolved = function () {
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
	if (this.timer.seconds > 60) return PERF_COMMENTS.slow;
	if (this.moveCounter.moves<11) return PERF_COMMENTS.astonishing;
	if (this.moveCounter.moves<13) return PERF_COMMENTS.excellent;
	if (this.moveCounter.moves<15) return PERF_COMMENTS.good;
	if (this.moveCounter.moves<17) return PERF_COMMENTS.OK;
	if (this.moveCounter.moves<19) return PERF_COMMENTS.bad;
	if (this.moveCounter.moves>=19) return PERF_COMMENTS.verybad;
};

/**
 * @constructor
 * @description Creates a new Modal object
 *
 * @property {Object}  DOMNode          DOM object related to the modal.
 * @property {Object}  DOMNodeModalText DOM object related to the modal text.
 * @property {Object}  DOMNodeClose DOM object related to the modal close button.
 * @property {Object}  opened           tells whether the modal is open
 */
let Modal = function() {
	this.DOMNode = document.getElementById('modal');
	this.DOMNodeText = document.getElementById('modal-text');
	this.DOMNodeClose = document.getElementById('modal-close');
	this.opened = false;
};

/**
 * @description Show/hides the modal.
 *
 * @param {Boolean} show Indicates whether to show or hide the modal.
 */
Modal.prototype.show = function (show) {
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
 * @param {String} text text to be shown on the modal.
 */
Modal.prototype.open = function (text) {
	this.setText(text);
	this.opened=true;
	this.show(true);
};

/*
 *
 * Initial calls
 *
 */

 window.onload=function() {

 	const DOM_GAME_START = document.getElementById('game-new');
 	const DOM_GAME_RESTART = document.getElementById('game-restart');

	let chemMatchGame = new Game();
	window.chemMatchModal = new Modal();

	manageButtonsVisibility(chemMatchGame.started);

	/*
	 *
	 * Events
	 *
	 */

	/**
   * @description Click event on deck for card flipping; and round and game management.
	 *
	 */

	chemMatchGame.deck.DOMNode.addEventListener('click', async function(event) {
		if (chemMatchGame.started === true &&
			  chemMatchGame.roundComplete === false &&
			  event.target.tagName==='LI'){
			let chemMatchCard = chemMatchGame.deck.cards.find(card => 'card-'+card.id === event.target.id);

			chemMatchCard.flip();

			if (chemMatchGame.getCurrentRoundCardCount()===2) {
				chemMatchGame.roundComplete = true;
				chemMatchGame.solveRound();
				if (chemMatchGame.isSolved()) {
					chemMatchGame.end();
					let dialogText = `You solved the game in ${chemMatchGame.moveCounter.moves} moves,
		              ${formatMinutes(chemMatchGame.timer.seconds)} minute(s) and
		              ${formatSeconds(chemMatchGame.timer.seconds)} seconds: <p>${chemMatchGame.getPerformanceComment()}</p>`;

					await sleep(1000);
					showNewGameButton(true);
					window.chemMatchModal.open(dialogText);
				}
			}
		}
	});


	/**
   * @description Click event on buttons New game and restart game.
	 *
	 */

	[DOM_GAME_START, DOM_GAME_RESTART].forEach(item => {
	  item.addEventListener('click', event => {
	  	chemMatchGame.end();
	  	chemMatchGame.reset();
			chemMatchGame.start();
			manageButtonsVisibility(chemMatchGame.started);
	  });
	});

	/**
   * @description Click event on window and button close modal.
	 *
	 */

	[window, window.chemMatchModal.DOMNodeClose].forEach(item => {
	  item.addEventListener('click', event => {
	  	if (window.chemMatchModal.opened && event.target.id !== 'modal-content') {
	  		window.chemMatchModal.show(false);
	  	 }
	  });
	});
};