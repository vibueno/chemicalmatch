/**
 *
 * Constants
 *
 */

/**
 * The size of the array cardSymbols does not really matter, as long as its length equals at least
 * half the of the board size
 */
const cardSymbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
                     "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

const boardSize = 16;

/**
 * Creates a new Card
 * @class
 */
let Card = function(cardSymbol){
	this.cardSymbol = cardSymbol;
};

/**
 * Creates a new Board
 * @class
 */
let Board = function(boardSize){

	if (boardSize / 2 > cardSymbols.length) throw `There are not enough symbols for a board of size ${boardSize}.`;

	this.boardSize = boardSize;
	this.cards = new Array();

	for (i=0;i<=(boardSize)-1;i++){
		this.cards[i] = new Card(cardSymbols[Math.floor(i/2)]);
	}
};

Board.prototype.shuffleCards = function () {
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

Board.prototype.showCards = function () {

	let docBoard = document.getElementsByClassName("board");

	this.cards.forEach(card => {
		let cardHTML = `<li class="card"><i class="fa ${card.cardSymbol} fa-2x"></i></li>`;
		docBoard[0].innerHTML += cardHTML;
	});
}

/*
 *
 * Initial calls
 *
 */

 window.onload=function(){
	pairOdromBoard = new Board(boardSize);
	pairOdromBoard.shuffleCards();
	pairOdromBoard.showCards();
}

/*
 TODO

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */