const express = require('express')
const morgan = require('morgan')
const products = require('./products')

const app = express()
app.use(morgan('combined'))

app.set('view engine', 'pug')

app.get('/products', (req, res) => {
  const page = req.query.page
  res.status(200).send(JSON.stringify(products[page]))
})

app.listen(3001)
