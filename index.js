const express = require('express')
const morgan = require('morgan')
const products = require('./products')

const app = express()

app.use(morgan('combined'))

app.set('view engine', 'pug')

app.get('/products', (req, res, next) => {
  const page = (req.query.page && parseInt(req.query.page)) || 0
  if (products[page]) {
    res.status(200).render('product-list', { products: products[page], page, pageCount: products.length })
  } else {
    next()
  }
})

app.use((req, res, next) =>
  res.status(404).render('404'))

app.use((error, req, res, next) =>
  res.status(500).render('500', { error }))

app.listen(3001)
