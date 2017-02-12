const path = require('path')
const express = require('express')
const morgan = require('morgan')
const urlFactory = require('url-factory').default

const products = require('./products')

const app = express()
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
  const link = linkFactory(req)

  const page = (req.query.page && parseInt(req.query.page)) || 0

  if (products[page]) {
    res.status(200).render('product-list', { products: products[page], page, pageCount: products.length, link })
  } else {
    next()
  }
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).render('500', { error })
})

console.log(`start listening on port ${process.env.PORT}`)
app.listen(process.env.PORT)

function stripTrailingSlash (host) {
  const cleaned = host.replace(/\/$/, '')
  console.log(cleaned)
  return cleaned
}

function linkFactory (req) {
  return urlFactory(`//${stripTrailingSlash(req.headers.host)}`)
}
