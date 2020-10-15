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
const docDeck = document.getElementsByClassName("deck")[0];
const docrestartGame = document.getElementsByClassName("restart")[0];


/**
 * Shuffles an array
 * @param  {[array]} array array to be shuffled
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
 * @param  {[Number]} ms amount of miliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates a new Card
 * @class
 *
 * @property {Number}  id             identifier of the card.
 * @property {String}  figure         font-awesome icon assigned to the card.
 * @property {Boolean} solved         tells whether the card has been solved.
 * @property {Boolean} inCurrentRound tells whether the card is being used in the current round.
 */
let Card = function(id, figure){
	this.id = id;
	this.figure = figure;
	this.solved = false;
	this.inCurrentRound = false;
};

/**
 * Flips the card
 */
Card.prototype.flip = function () {

	let docCard = document.getElementById(`card${this.id}`);

	if (this.solved===false){
		docCard.classList.add("open", "show");
		this.inCurrentRound = true;
	}
};

/**
 * Flips the card back
 */
Card.prototype.flipBack = function () {

	let docCard = document.getElementById(`card${this.id}`);

	if (this.solved===false){
		docCard.classList.remove ("open", "show");
		this.inCurrentRound = false;
	}
};

/**
 * Creates a new Deck
 * @class
 *
 * @property {Number}  deckSize      number of cards of the deck.
 * @property {Boolean} roundComplete tells whether two cards have been flipped in the current round.
 * @property {Array}   cards         card objects included the deck.
 */
let Deck = function(deckSize){

	if (deckSize / 2 > cardFigures.length) throw `There are not enough figures for a deck of size ${deckSize}.`;

	this.deckSize = deckSize;


	/**
	 * This method adds more properties to the Deck class.
	 * This happens inside initialize, since these properties need to be reset every time a new game starts
	 */

	this.initialize();

};

/**
 * Initializes the deck
 */
Deck.prototype.initialize = function(){

	this.roundComplete = false;
	this.resetMoveCounter();
	docDeck.innerHTML ="";

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

	this.shuffleCards();
	this.showCards();

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
Deck.prototype.showCards = function () {
	this.cards.forEach(card => {
		let cardHTML = `<li id="card${card.id}" class="card"><i class="fas ${card.figure}"></i></li>`;
		docDeck.innerHTML += cardHTML;
	});
};

/**
 * Returns the number of cards used in the current round
 */
Deck.prototype.getCurrentRoundCount = function () {
	return this.cards.filter(card => card.inCurrentRound === true).length;
};

/**
 * Solves the current round
 */
Deck.prototype.solveRound = async function () {
	let currentRoundCards = this.cards.filter(card => card.inCurrentRound === true);

	//If there is a match
	if (currentRoundCards[0].figure === currentRoundCards[1].figure){
		currentRoundCards[0].solved=true;
		currentRoundCards[1].solved=true;
	}
	else
	{
		await sleep(1000);
		currentRoundCards[0].flipBack();
		currentRoundCards[1].flipBack();
	}

	currentRoundCards[0].inCurrentRound=false;
	currentRoundCards[1].inCurrentRound=false;

	this.incrementMoveCounter();
	this.roundComplete = false;
};

/**
 * Solves the game
 */
Deck.prototype.solveGame = function () {
	let notSolvedCards = this.cards.filter(card => card.solved === false);

	if (notSolvedCards.length === 0){
		alert (`Congratulations! You solved the game in ${this.moveCounter} moves!`);
	}
};

/**
 * Increments the move counter
 */
Deck.prototype.incrementMoveCounter = function () {
	this.moveCounter++;

	let movesText =  (this.moveCounter === 1 ? "Move" : "Moves");

	const docMoveCounter = document.getElementsByClassName("moves")[0];
	docMoveCounter.textContent = `${this.moveCounter} ${movesText}`;
};

/**
 * Resets the move counter
 */
Deck.prototype.resetMoveCounter = function () {
	this.moveCounter=0;
	const docMoveCounter = document.getElementsByClassName("moves")[0];
	docMoveCounter.textContent = this.moveCounter+ " Moves";
};

/*
 *
 * Initial calls
 *
 */

 window.onload=function(){

	let pairOdromDeck = new Deck(deckSize);

	/*
	 *
	 * Events
	 *
	 */

	docDeck.addEventListener('click', function(event){
		if (pairOdromDeck.roundComplete === false && event.target.tagName==="LI"){
			let pairOdromcard = pairOdromDeck.cards.find(card => "card"+card.id === event.target.id);

			pairOdromcard.flip();

			if (pairOdromDeck.getCurrentRoundCount()===2){
				pairOdromDeck.roundComplete = true;
				pairOdromDeck.solveRound();
				pairOdromDeck.solveGame();
			}
		}
	});

	docrestartGame.addEventListener('click', function(){
		pairOdromDeck.initialize();
	});

};