import idiom from 'idiom.js'

const lang = idiom({
  'default': {
    'welcome': 'MP-Picross!'
  }
})

export default lang(window.navigator.language)
