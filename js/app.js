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
		              ${formatSeconds(chemMatchGame.timer.seconds)} seconds.
		              <p>${chemMatchGame.getPerformanceComment()}</p>`;

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