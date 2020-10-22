import { Game, Modal } from './modules/classes.js';
import { functions } from './modules/functions.js';

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
			window.chemMatchModal.open("Do you really want to start a new game?", 'question', 'restartGame');
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
		              ${functions.formatMinutes(chemMatchGame.timer.seconds)} minute(s) and
		              ${functions.formatSeconds(chemMatchGame.timer.seconds)} seconds(s).
		              <p>${chemMatchGame.getPerformanceComment()}</p>`;

					await functions.sleep(1000);
					setGameBtnsVisibility(false);
					window.chemMatchModal.open(dialogText, 'info', 'endGame');
				}
			}
		}
	});

};