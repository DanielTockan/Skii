const path = require('path')
const dist = path.join(__dirname, 'dist')
const express = require('express')
const Router = require('./router')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressServer = express()
const { dbURI, port } = require('./config/environment')


mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err)
    else console.log('Mongoose connected successfully!')
  }
)

expressServer.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

expressServer.use(bodyParser.json())

expressServer.use('/api', Router)
expressServer.use('/', express.static(dist))

expressServer.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})
expressServer.listen(port)