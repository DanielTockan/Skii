const Resorts = require('../models/resorts')
const axios = require('axios')
const User = require('../models/users')


function singleProxyResort(req, res) {
}

function getResorts(req, res) {

  Resorts
    .find()
    .populate('user')
    .populate('comments.user')
    .then(resorts => {
      console.log('here')
      console.log(resorts)
      res.send(resorts)
    })

}

function addResort(req, res) {
  Resorts
    .create(req.body)
    .then(resort => {
      res.send(resort)
    })
    .catch(error => res.send(error))
}

function singleResort(req, res) {

  const name = req.params.name

  Resorts.
    findOne({ name: name })
    .populate('comments.user')
    .then(resort => {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${resort.lat}&lon=${resort.lon}&exclude=hourly,minutely&appid=b12529b2552a67b6714b256d3318424c`)
        .then(resp => {


          res.send({ resort: resort, weather: resp.data })
        })



    })
    .catch(error => {
      console.log(error)
      res.send(error)
    })

}

// function removeResort(req, res) {
//   const name = req.params.name

//   Resorts
//    .findOne({ name: { regex: name, $options: 'i' } })
//    .then(resort => {
//      resort.deleteOne()
//      res.send(resort)
//    })
// }

// function editResort(req, res) {
//   const name = req.params.name
//   const body = req.body

//   Resorts
//    .then(resort => {
//      if (!resort) return res.send({ message: 'No team' })
//      resort.set(body)
//      resort.save()
//      res.send(resort)
//    })
// }

function createComment(req, res) {

  const comment = req.body
  console.log(comment)

  comment.user = req.currentUser

  const name = req.params.name
  console.log(req.params.name)


  Resorts
    .findOne({ name: name })
    .populate('comments.user')
    .then(resort => {
      console.log('hello')

      if (!resort) return res.status(404).send({ message: 'Resort not found' })

      resort.comments.push(comment)

      return resort.save()
    })

    .then(resort => res.send(resort))
    .catch(err => res.send(err))
}


function editComment(req, res) {

  const id = req.params.resortId

  Resorts
    .findOne({ _id: id })
    .populate('comments.user')
    .then(resort => {
      console.log(resort)

      if (!resort) return res.status(404).send({ message: 'Resort not found' })

      const comment = resort.comments.id(req.params.commentId)

      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      comment.set(req.body)

      return resort.save()
    })

    .then(resort => res.send(resort))
    .catch(err => res.send(err))

}

function deleteComment(req, res) {


  const name = req.params.name

  req.body.user = req.currentUser

  Resorts
    .findOne({ name: name })
    .populate('comments.user')
    .then(resort => {

      if (!resort) return res.status(404).send({ message: 'Not found' })

      const comment = resort.comments.id(req.params.commentId)

      if (!comment.user.equals(req.currentUser._id) && (!req.currentUser.isAdmin)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      comment.remove()

      return resort.save()
    })

    .then(resort => res.send(resort))
    .catch(err => res.send(err))
}

function addToFavourites(req, res) {

  const favourite = req.body

  req.body.user = req.currentUser

  const name = req.params.name

  User
    .findOne({ name: name })
    .populate('favourites.user')
    .then(user => {
     
      if (!user) return res.status(404).send({ message: 'User not found' })

      user.favourites.push(favourite)

      return favourite.save()
    })

    .then(user => res.send(user))
    .catch(err => res.send(err))
}

function createUser(req, res) {
  const body = req.body
  console.log(body)
  User
    .create(body)
    .then(user => {
      console.log(user)
      console.log('here')
      res.send(user)
    })
    .catch(error => res.send(error))
}


module.exports = {
  singleProxyResort,
  getResorts,
  addResort,
  singleResort,
  // removeResort,
  // editResort,
  createComment,
  editComment,
  deleteComment
}