const YANG = require('yet-another-name-generator')
const lorem = require('lorem-ipsum')

const pages = new Array(10, null) // eslint-disable-line no-array-constructor
const entries = new Array(10, null) // eslint-disable-line no-array-constructor

module.exports = pages
  .map(() => entries.map(() => ({
    name: YANG.generate({ titleize: true }),
    description: lorem()
  })))
