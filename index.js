const url = require('url')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const urlFactory = require('url-factory').default
const accepts = require('accepts')

const config = require('./package.json').config

const products = require('./products')
const pagedProducts = products.paged

const app = express()
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
  const accept = accepts(req)
  const link = linkFactory(req.headers.host)

  const page = (req.query.page && parseInt(req.query.page)) || 0

  if (pagedProducts[page]) {
    switch (accept.type(['html', 'json'])) {
      case 'html':
        res.setHeader('Content-Type', 'text/html')
        res.status(200).render('product-list', { products: pagedProducts[page], page, pageCount: pagedProducts.length, link })
        break
      case 'json':
        res.setHeader('Content-Type', 'application/json')
        // NOTE: usually this should also be paged, but this feature is omitted intentionelly
        res.status(200).send(JSON.stringify({ products: products.all }))
        break
    }
  } else {
    next()
  }
})

app.get('/:id', (req, res, next) => {
  // base url for link factory without id param
  const link = linkFactory(url.resolve(req.headers.host, '.'))
  const order = urlFactory('/order')

  const product = products.find(parseInt(req.params.id))

  if (product) {
    return res.status(200).render('product', { product, link, order })
  }

  next()
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).render('500', { error })
})

const port = process.env.PORT || config.port
console.log(`start listening on port ${port}`)
app.listen(port)

function stripTrailingSlash (host) {
  const cleaned = host.replace(/\/$/, '').replace(/:$/, '')
  console.log(cleaned)
  return cleaned
}

function linkFactory (host) {
  return urlFactory(`//${stripTrailingSlash(host)}`)
}
