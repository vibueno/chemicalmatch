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

const CARD_FIGURES = ['cat', 'bath', 'crow', 'anchor', 'cocktail',
                      'cube', 'leaf', 'bicycle', 'bomb', 'couch',
                      'fish', 'hamburger', 'hippo', 'kiwi-bird', 'pepper-hot',
                      'subway', 'swimmer', 'theater-masks', 'toilet-paper', 'yin-yang',
                      'toilet', 'ankh', 'bacterium', 'biohazard','bong',
                      'brain', 'camera-retro', 'carrot', 'moon', 'hand-spock',
                      'frog', 'ghost', 'hiking', 'helicopter', 'hat-wizard',
                      'hotdog', 'dog', 'life-ring', 'chess-rook', 'piggy-bank',
                      'poop', 'quidditch', 'snowman', 'spider', 'user-astronaut',
                      'snowplow', 'user-injured', 'american-sign-language-interpreting', 'baby', 'bug',
                      'cannabis','chess-knight','chess-bishop','chess-pawn','chess-queen',
                      'archway', 'award', 'basketball-ball', 'binoculars', 'birthday-cake',
                      'bone', 'bowling-ball', 'bullhorn', 'chair', 'cash-register',
                      'charging-station', 'child', 'cloud', 'cloud-sun', 'compact-disc',
                      'crosshairs', 'dice', 'dice-d20', 'dna', 'dog',
                      'egg', 'eye-dropper', 'faucet', 'feather', 'filter',
                      'band-aid', 'beer', 'box', 'box-open', 'bus-alt',
                      'candy-cane', 'dumpster', 'car-crash', 'dragon', 'drum',
                      'peace', 'golf-ball', 'highlighter', 'lemon', 'meteor',
                      'dungeon', 'envelope-open-text', 'fan', 'female', 'gift',
                      'globe-africa', 'graduation-cap', 'grin-tongue-squint', 'hand-lizard', 'hot-tub',
                      'igloo', 'lightbulb', 'mask', 'mitten', 'mosque'];
const DECK_SIZE = 16;

const PERF_COMMENTS = {'astonishing':
												['Seriously, how the f*** did you do that!?',
												 'Go away! You are a wizard!',
												 'Are you even human!?'],
											 'excellent':
											 	['You surely will be remembered for this performance!',
											 	'Amazing! I cannot believe my eyes!'],
											 'good':
											 	['Keep training your brain. You are getting there!',
											 	 'Not too bad. Not too bad...'],
											 'OK':
											 	['You are starting to have memory leaks!',
											 	 'Come on! Push yourself further!'],
											 'bad':
											 	['You should start eating brocoly to improve your memory!',
											 	 'Either you start playing better, or I will just close myself. You choose.'],
											 'verybad':
											 	['Are you kidding me? Can you even remember your name?',
											   'This is the worst I have seen since The Hobbit movies!',
											   'You may need another kind of games. Let\'s try this one: how much is 1+1?'],
											 'slow':
											 	['Did you fall asleep!?',
											 	 'Were you chatting with your sweetie pie or what?',
											 	 'Someone bring me a gun, please... Boooooriiiiingg!']
											};

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
function setNewGameBtnVisibility(show) {

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
function setRestartGameBtnVisibility(show) {

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
function setGameBtnsVisibility(gameStarted) {
	if (gameStarted){
		setNewGameBtnVisibility(false);
		setRestartGameBtnVisibility(true);
	}
	else {
		setNewGameBtnVisibility(true);
		setRestartGameBtnVisibility(false);
	}
}

/*
 *
 * Initial calls
 *
 */

window.onload = function(){

	let chemMatchGame = new Game();
	window.chemMatchModal = new Modal();

	setGameBtnsVisibility(chemMatchGame.started);

	/*
	 *
	 * Events
	 *
	 */

	/**
   * @description Click event for buttons
	 *
	 */

	document.addEventListener('click', function(event){

		function newGame(){
			chemMatchGame.end();
  		chemMatchGame.reset();
			chemMatchGame.start();
			setGameBtnsVisibility(chemMatchGame.started);
		}

		if (event.target.id==="modal-button-yes") {

			switch(window.chemMatchModal.Id) {
		  case 'restartGame':
		  	newGame();
		    break;
		  case 'endGame':
		    break;
			}

			window.chemMatchModal.close();
		}

		else if (event.target.id==="modal-button-no") {
			window.chemMatchModal.close();
		}

		else if (event.target.id==="game-new") {
	  	newGame();
		}
		else if (event.target.id==="game-restart") {
			chemMatchModal.open("Do you really want to restart this game?", 'question', 'restartGame');
	  }
	  else if (event.target.id ==="modal" || event.target.id ==="modal-close"){
	  	window.chemMatchModal.close();
	  }
	});

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

			if (chemMatchGame.isRoundComplete()) {
				chemMatchGame.roundComplete = true;
				chemMatchGame.checkRound();
				if (chemMatchGame.isGameSolved()) {
					chemMatchGame.end();
					let dialogText = `You solved the game in ${chemMatchGame.moveCounter.moves} moves,
		              ${formatMinutes(chemMatchGame.timer.seconds)} minute(s) and
		              ${formatSeconds(chemMatchGame.timer.seconds)} seconds(s).
		              <p>${chemMatchGame.getPerformanceComment()}</p>`;

					await sleep(1000);
					setGameBtnsVisibility(false);
					window.chemMatchModal.open(dialogText, 'info', 'endGame');
				}
			}
		}
	});

};