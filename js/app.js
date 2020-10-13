/**
 *
 * Constants
 *
 */

/**
 * The size of the array cardFigures does not really matter, as long as its length equals at least
 * half the of the board size.
 *
 * If there are not enough figures, the board constructor will throw an error
 */
const cardFigures = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
                     "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
const boardSize = 16;
const docBoard = document.getElementsByClassName("board")[0];

/**
 * Creates a new Card
 * @class
 */
let Card = function(id, figure){
	this.id = id;
	this.figure = figure;
	this.flipped = false;
	this.solved = false;
	this.inCurrentRound = false;
};

Card.prototype.flip = function () {

	let docCard = document.getElementById(`card${this.id}`);

	if (this.solved===false && this.solved===false){
		docCard.className += " open show";
		this.flipped = true;
		this.inCurrentRound = true;
	}
}

/**
 * Creates a new Board
 * @class
 */
let Board = function(boardSize){

	if (boardSize / 2 > cardFigures.length) throw `There are not enough figures for a board of size ${boardSize}.`;

	this.boardSize = boardSize;
	this.moves = 0;

	/**
	 * Adding array of cards
	 *
	 */

	this.cards = new Array();
	for (i=0;i<=(boardSize)-1;i++){
		this.cards[i] = new Card(i, cardFigures[Math.floor(i/2)]);
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

	this.cards.forEach(card => {
		let cardHTML = `<li id="card${card.id}" class="card"><i class="fa ${card.figure} fa-2x"></i></li>`;
		docBoard.innerHTML += cardHTML;
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

	docBoard.addEventListener('click', function(){
		if (event.target.tagName==="LI"){
			let pairOdromcard = pairOdromBoard.cards.find(card => "card"+card.id === event.target.id);

			pairOdromcard.flip();
			console.log(pairOdromcard);
		}
	});

}

/*
 TODO

/*
 * In Card listeners:
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */