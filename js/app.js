/**
 *
 * Constants
 *
 */

/**
 * The size of the array cardFigures does not really matter, as long as its length equals at least
 * half the of the deck size.
 *
 * If there are not enough figures, the deck constructor will throw an error
 */
const cardFigures = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
                     "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const deckSize = 16;
const docDeck = document.getElementsByClassName("deck")[0];

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
	this.moveCounter = 0;

	/**
	 * Adding array of cards
	 *
	 */

	this.cards = new Array();
	for (i=0;i<=(deckSize)-1;i++){
		//We add the same figure twice
		this.cards[i] = new Card(i, cardFigures[Math.floor(i/2)]);
	}
};

Deck.prototype.shuffleCards = function () {
	// Shuffle function from http://stackoverflow.com/a/2450976
	let currentIndex = this.cards.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = this.cards[currentIndex];
		this.cards[currentIndex] = this.cards[randomIndex];
		this.cards[randomIndex] = temporaryValue;
	}
}

Deck.prototype.showCards = function () {

	this.cards.forEach(card => {
		let cardHTML = `<li id="card${card.id}" class="card"><i class="fa ${card.figure} fa-2x"></i></li>`;
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
	const docMoveCounter = document.getElementsByClassName("moves")[0];
	docMoveCounter.textContent = this.moveCounter;
}

/*
 *
 * Initial calls
 *
 */

 window.onload=function(){

	pairOdromDeck = new Deck(deckSize);
	pairOdromDeck.shuffleCards();
	pairOdromDeck.showCards();

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

}