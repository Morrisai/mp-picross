import idiom from 'idiom.js'

const lang = idiom({
  'default': {
    'welcome': 'MP-Picross!',
    'start': 'Start!',
    'gameOver': 'Game Over!'
  }
})

export default lang(window.navigator.language)
