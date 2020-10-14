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
                     "fa-subway", "fa-swimmer", "fa-theater-masks", "fa-toilet-paper", "fa-yin-yang"];
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
}

/**
 * Creates a new Card
 * @class
 */

let Card = function(id, figure){
	this.id = id;
	this.figure = figure;
	this.solved = false;
	this.inCurrentRound = false;
};

Card.prototype.flip = function () {

	let docCard = document.getElementById(`card${this.id}`);

	if (this.solved===false){
		docCard.classList.add("open", "show");
		this.inCurrentRound = true;
	}
}

Card.prototype.flipBack = function () {

	let docCard = document.getElementById(`card${this.id}`);

	if (this.solved===false){
		docCard.classList.remove ("open", "show");
		this.inCurrentRound = false;
	}
}

/**
 * Creates a new Deck
 * @class
 */

let Deck = function(deckSize){

	if (deckSize / 2 > cardFigures.length) throw `There are not enough figures for a deck of size ${deckSize}.`;

	this.deckSize = deckSize;
	this.initialize();

};

Deck.prototype.shuffleCards = function () {
	shuffle(this.cards);
}

Deck.prototype.initialize = function(){

	this.resetMoveCounter();
	docDeck.innerHTML ="";

	/**
	 * In case there are more figures than needed, this shuffle call makes the game more insteresting
	 * since every time the figures shown will be different
	 */
	shuffle (cardFigures);

	//Adding array of cards
	this.cards = new Array();
	for (i=0;i<=(deckSize)-1;i++){
		//We add the same figure twice
		this.cards[i] = new Card(i, cardFigures[Math.floor(i/2)]);
	}

	this.shuffleCards();
	this.showCards();

}

Deck.prototype.showCards = function () {
	this.cards.forEach(card => {
		let cardHTML = `<li id="card${card.id}" class="card"><i class="fas ${card.figure} fa-2x"></i></li>`;
		docDeck.innerHTML += cardHTML;
	});
}

Deck.prototype.getFlippedCardsCount = function () {
	return pairOdromDeck.cards.filter(card => card.inCurrentRound === true).length;
}

Deck.prototype.solveRound = function () {
	let currentRoundCards = pairOdromDeck.cards.filter(card => card.inCurrentRound === true);

	//If there is a match
	if (currentRoundCards[0].figure === currentRoundCards[1].figure){
		currentRoundCards[0].solved=true;
		currentRoundCards[1].solved=true;
	}
	else
	{
		currentRoundCards[0].flipBack();
		currentRoundCards[1].flipBack();
	}

	currentRoundCards[0].inCurrentRound=false;
	currentRoundCards[1].inCurrentRound=false;

	this.incrementMoveCounter();
}

Deck.prototype.solveGame = function () {
	let notSolvedCards = pairOdromDeck.cards.filter(card => card.solved === false);

	if (notSolvedCards.length === 0){
		alert (`Congratulations! You solved the game in ${this.moveCounter} moves!`);
	}
}

Deck.prototype.incrementMoveCounter = function () {
	this.moveCounter++;

	let movesText =  (this.moveCounter === 1 ? "Move" : "Moves");

	const docMoveCounter = document.getElementsByClassName("moves")[0];
	docMoveCounter.textContent = `${this.moveCounter} ${movesText}`;
}

Deck.prototype.resetMoveCounter = function () {
	this.moveCounter=0;
	const docMoveCounter = document.getElementsByClassName("moves")[0];
	docMoveCounter.textContent = this.moveCounter+ " Moves";
}

/*
 *
 * Initial calls
 *
 */

 window.onload=function(){

	pairOdromDeck = new Deck(deckSize);

	/*
	 *
	 * Events
	 *
	 */

	docDeck.addEventListener('click', function(){
		if (event.target.tagName==="LI"){
			let pairOdromcard = pairOdromDeck.cards.find(card => "card"+card.id === event.target.id);

			pairOdromcard.flip();

			if (pairOdromDeck.getFlippedCardsCount()===2){
				pairOdromDeck.solveRound();
				pairOdromDeck.solveGame();
			}
		}
	});

	docrestartGame.addEventListener('click', function(){
		pairOdromDeck.initialize();
	});

}