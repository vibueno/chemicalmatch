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