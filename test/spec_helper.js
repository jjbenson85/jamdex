// allows us to write our tests in ES6
process.env.NODE_ENV = 'test'
require('@babel/register')()

// setup JSDOM
const { JSDOM } = require('jsdom')

const { window } = new JSDOM(`
  <!DOCTYPE html>
  <html>
  <body></body>
  </html>
`, {
  url: 'http://localhost'
})

window.localStorage = global.localStorage = (function() {
  const store = {}

  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value
    },
    removeItem(key) {
      delete store[key]
    }
  }
}())

// setup Enzyme
const Adapter = require('enzyme-adapter-react-16')
require('enzyme').configure({ adapter: new Adapter() })

// copy any global properties from `window` to `global`
const props = Object.getOwnPropertyNames(window)
  .filter(prop => typeof global[prop] === 'undefined')
  .map(prop => Object.getOwnPropertyDescriptor(window, prop))

Object.defineProperties(global, props)

global.window = window
global.document = window.document
