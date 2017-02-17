const YANG = require('yet-another-name-generator')
const lorem = require('lorem-ipsum')

const pageCount = 10
const pageSize = 10
const pages = new Array(pageCount).fill(null) // eslint-disable-line no-array-constructor
const entries = new Array(pageSize).fill(null) // eslint-disable-line no-array-constructor

const id = (page, pageCount, index) => (Math.max(0, page - 1) * pageCount) + index

class Product {
  constructor (page, pageCount, index) {
    this.id = id(page, pageCount, index)
    this.name = YANG.generate({ titleize: true })
    this.description = lorem()
    this.price = (Math.random() * 1000 % 666).toFixed(2)
  }
}

const products = []
const pagedProducts = pages
  .map((_, page) => entries.map((_, index) => {
    const product = new Product(page, pageCount, index)
    products.push(product)
    return product
  }))

const find = (id) => products.find(el => el.id === id)

module.exports = {
  all: products,
  paged: pagedProducts,
  find
}
