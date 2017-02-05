const YANG = require('yet-another-name-generator')
const lorem = require('lorem-ipsum')

module.exports = new Array(10, null) // eslint-disable-line no-array-constructor
  .map(() => ({
    name: YANG.generate({ titleize: true }),
    description: lorem()
  }))
