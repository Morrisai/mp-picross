import idiom from 'idiom.js';


const lang = idiom({
	default: {
		title: 'MP-Picross!',
		start: 'Create New Game!',
		playAgain: 'play Again!',
		gameOver: 'Game Over!',
		gameWon: 'You Won!',
		restartGame: 'Restart Game',
		"link": "Link to join this game: ",
		"joinRoom": "Enter Room Id:",
		"join": "Join Game!"
	}
});

export default lang(window.navigator.language);
