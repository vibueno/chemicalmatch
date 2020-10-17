/**
 *
 * Constants
 *
 */

/**
 * The size of the array cardFigures does not really matter, as long as its length equals at least
 * half the of the deck size.
 *
 * If the number of card figures in cardFigures exceeds half of the deck size, the programm will choose
 * the correct amount of figures randomly
 *
 * If there are not enough figures, the deck constructor will throw an error.
 */

const cardFigures = ["fa-cat", "fa-bath", "fa-crow", "fa-anchor", "fa-cocktail",
                     "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-couch",
                     "fa-fish", "fa-hamburger", "fa-hippo", "fa-kiwi-bird", "fa-pepper-hot",
                     "fa-subway", "fa-swimmer", "fa-theater-masks", "fa-toilet-paper", "fa-yin-yang",
                     "fa-toilet", "fa-ankh", "fa-bacterium", "fa-biohazard","fa-bong",
                     "fa-brain", "fa-camera-retro", "fa-carrot", "fa-moon", "fa-hand-spock",
                     "fa-frog", "fa-ghost", "fa-hiking", "fa-helicopter", "fa-hat-wizard",
                     "fa-hotdog", "fa-dog", "fa-life-ring", "fa-chess-rook", "fa-piggy-bank",
                     "fa-poop", "fa-quidditch", "fa-snowman", "fa-spider", "fa-user-astronaut"];
const deckSize = 16;

let pairOdromGame = null;

/**
 * Shuffles an array
 * @param  {[array]} array array to be shuffled.
 */
let shuffle = function (array){

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
 * Pauses execution
 * @param  {[Number]} ms amount of miliseconds.
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formats number to 00
 * @param  {[Number]} val value to be formatted.
 */
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

/**
 * Returns formatted amount of seconds
 * @param  {[Number]} seconds number of seconds.
 */
function formatSeconds(seconds){
	return pad(seconds % 60);
}

/**
 * Returns formatted amount of minutes
 * @param  {[Number]} seconds number of seconds.
 */
function formatMinutes(seconds){
	return pad(parseInt(seconds / 60));
}

	/**
	 * Shows/Hides the button New Game
	 * @param  {[Boolean]} show indicates whether to show or hide the button
	 */
	function showNewGameButton(show){

		const DOMGameStart = document.getElementsByClassName("game-start")[0];

		if (show){
			DOMGameStart.classList.add("game-start-show");
		  DOMGameStart.classList.remove("game-start-hidden");
		}
		else{
			DOMGameStart.classList.add("game-start-hidden");
		  DOMGameStart.classList.remove("game-start-show");
		}
	}

/**
 * Creates a new Card
 * @class
 *
 * @property {Number}  id             identifier of the card.
 * @property {String}  figure         font-awesome icon assigned to the card.
 * @property {Boolean} solved         tells whether the card has been solved.
 * @property {Boolean} inCurrentRound tells whether the card is being used in the current round.
 * @property {Object}  DOMNode        DOM object related to the card. To spare further lookups.
 */
let Card = function(id, figure){
	this.id = id;
	this.figure = figure;
	this.solved = false;
	this.inCurrentRound = false;
	this.DOMNode = null;
};

/**
 * Flips the card
 */
Card.prototype.flip = function () {

	if (this.solved===false){
		this.DOMNode.classList.add("flipped");
		this.inCurrentRound = true;
	}
};

/**
 * Flips the card back
 */
Card.prototype.flipBack = function () {
	if (this.solved===false){
		this.DOMNode.classList.remove ("flipped");
		this.inCurrentRound = false;
	}
};

/**
 * Creates a new move counter
 * @class
 *
 * @property {Number}         moves stores the number of moves performed in the current game.
 * @property {Object} DOMNode DOM object related to the counter. To spare further lookups.
 */
let MoveCounter = function(){
	this.moves = 0;
	this.DOMNode = document.getElementsByClassName("moves")[0];
};

/**
 * Resets the counter
 */
MoveCounter.prototype.reset = function(){
	this.moves = 0;
	this.DOMNode.textContent = `${this.moves} Moves`;
};

/**
 * Increments the counter
 */
MoveCounter.prototype.increment = function(){
	this.moves++;
	let movesText = (this.moves === 1 ? "Move" : "Moves");
	this.DOMNode.textContent = `${this.moves} ${movesText}`;
};

/**
 * Creates a new timer
 * @class
 *
 */
let Timer = function(){
	//https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
	this.running = false;
	this.seconds = 0;
	this.DOMNodeTimer = document.getElementById("timer");
	this.DOMNodeTimer.innerHTML="00:00";
};

/**
 * Starts the timer
 */
Timer.prototype.start = function(){

	//We need to bind this, in order to not to lose its value due to
	//the use of setInterval
	this.IntervalId = setInterval(this.update.bind(this), 1000);
	this.running = true;
};

/**
 * Stops the timer
 */
Timer.prototype.stop = function(){
	clearInterval(this.IntervalId);
	this.running = false;
};

/**
 * Updates the timer
 */
Timer.prototype.update = function(){
  this.seconds++;
  this.DOMNodeTimer.innerHTML = `${formatMinutes(this.seconds)}:${formatSeconds(this.seconds)}`;
};

/**
 * Resets the timer
 */
Timer.prototype.reset = function(){
	this.stop();
  this.seconds = 0;
  this.minutes = 0;
  this.DOMNodeTimer.innerHTML = "00:00";
};

/**
 * Creates a new Deck
 * @class
 *
 * @property {Number}  deckSize      number of cards of the deck.
 * @property {Object}  moveCounter   object containing the functionality of the move counter.
 * @property {Boolean} roundComplete tells whether two cards have been flipped in the current round.
 * @property {Array}   cards         card objects included the deck.
 * @property {Object}  DOMNode       DOM object related to the deck. To spare further lookups.
 */
let Deck = function(deckSize){

	if (deckSize / 2 > cardFigures.length) throw `There are not enough figures for a deck of size ${deckSize}.`;

	this.deckSize = deckSize;
	this.DOMNode = document.getElementsByClassName("deck")[0];

	/**
	 * The initialize method adds more properties to the Deck class.
	 * This happens inside this method, since these properties need to be reset every time a new game starts
	 */
	this.initialize();

};

/**
 * Adds cards to the deck
 */
Deck.prototype.addCards = function(){

	/**
	 * In case there are more figures than needed, this shuffle call makes the game more insteresting
	 * since every time the figures shown will be different
	 */
	shuffle (cardFigures);

	//Adding array of cards
	this.cards = [];
	for (let i=0;i<=(deckSize)-1;i++){
		//We add the same figure twice
		this.cards[i] = new Card(i, cardFigures[Math.floor(i/2)]);
	}
};

/**
 * Initializes the deck
 */
Deck.prototype.initialize = function(){

	this.DOMNode.innerHTML ="";

	this.addCards();
	this.shuffleCards();
	this.setUpDOMCards();
};

/**
 * Shuffles the cards in the deck
 */
Deck.prototype.shuffleCards = function () {
	shuffle(this.cards);
};

/**
 * Adds cards to the DOM
 */
Deck.prototype.addCardstoDOM = function () {

	return new Promise((resolve) => {
		this.cards.forEach(card => {
			let cardHTML = `<li id="card${card.id}" class="card"><i class="fas ${card.figure}"></i></li>`;
			this.DOMNode.innerHTML += cardHTML;
		});
		resolve("Cards added");
	});
};

/**
 * Adds DOM Nodes to the cards
 */
Deck.prototype.addDOMNodetoCards = function () {
	this.cards.forEach(card => {
		card.DOMNode = document.getElementById(`card${card.id}`);
	});
};

/**
 * Sets up everything between the cards and the DOM
 */
Deck.prototype.setUpDOMCards = async function () {
	await this.addCardstoDOM();
	this.addDOMNodetoCards();
};

/**
 * Creates a new Game
 * @class
 *
 */

let Game = function(Deck){
	this.moveCounter = new MoveCounter();
	this.timer = new Timer();
	this.roundComplete = false;
	this.Deck = Deck;
};

Game.prototype.start = function(){
	this.timer.start();
};

/**
 * Returns the number of cards used in the current round
 */
Game.prototype.getCurrentRoundCount = function () {
	return this.Deck.cards.filter(card => card.inCurrentRound === true).length;
};

/**
 * Solves the current round
 */
Game.prototype.solveRound = async function () {
	let currentRoundCards = this.Deck.cards.filter(card => card.inCurrentRound === true);

	this.moveCounter.increment();

	//If there is a match
	if (currentRoundCards[0].figure === currentRoundCards[1].figure){

		currentRoundCards.forEach(function(card){
			card.solved=true;
			card.DOMNode.classList.add("matchtrans");
		});

		await sleep(1500);

		currentRoundCards.forEach(function(card){
			card.DOMNode.classList.remove("matchtrans");
			card.DOMNode.classList.add("match");
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
 * Solves the game
 */
Game.prototype.solveGame = function () {
	let notSolvedCards = this.Deck.cards.filter(card => card.solved === false);

	if (notSolvedCards.length === 0){
		this.timer.stop();
		showNewGameButton(true);
		alert (`Congratulations! You solved the game in ${this.moveCounter.moves} moves, ${formatMinutes(this.timer.seconds)} minute(s) and ${formatSeconds(this.timer.seconds)} seconds`);
	}
};

/*
 *
 * Initial calls
 *
 */

 window.onload=function(){

 	const DOMRestartGame = document.getElementById("restart");
 	const DOMGameStart = document.getElementsByClassName("game-start")[0];

	let pairOdromDeck = new Deck(deckSize);
	pairOdromDeck.initialize();

	/*
	 *
	 * Events
	 *
	 */

	pairOdromDeck.DOMNode.addEventListener('click', function(event){
		if (pairOdromGame.roundComplete === false && event.target.tagName==="LI"){
			let pairOdromCard = pairOdromDeck.cards.find(card => "card"+card.id === event.target.id);

			pairOdromCard.flip();

			if (pairOdromGame.getCurrentRoundCount()===2){
				pairOdromGame.roundComplete = true;
				pairOdromGame.solveRound();
				pairOdromGame.solveGame();
			}
		}
	});

	DOMGameStart.addEventListener('click', function(){
		pairOdromGame = new Game (pairOdromDeck);
		pairOdromGame.start();
		showNewGameButton(false);
	});

	DOMRestartGame.addEventListener('click', function(){
		pairOdromGame = new Game (pairOdromDeck);
	});

};