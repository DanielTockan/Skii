const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/users')

function secureRoute(req, res, next) {
  const authToken = req.headers.authorization

  if (!authToken || !authToken.startsWith('Bearer')) {
    console.log('first check')
    return res.status(401).send({ message: 'Unauthorised' })
  }
  const token = authToken.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).send({ message: 'Unauthorised' })

    const userId = payload.sub
    User
      .findById(userId)
      .then(user => {
        if (!user) return res.status(401).send({ message: 'Unauthorised' })

        req.currentUser = user

        next()
      })
      .catch(()=> res.status(401).send({ message: 'Unauthorised' }))
  })
}

module.exports = secureRoute