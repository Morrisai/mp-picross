import idiom from 'idiom.js'

const lang = idiom({
  'default': {
    'title': 'MP-Picross!',
    'start': 'Start!',
    'playAgain': 'play Again!',
    'gameOver': 'Game Over!',
    'gameWon': 'You Won!',
    'restartGame':'Restart Game'
  }
})

export default lang(window.navigator.language)
