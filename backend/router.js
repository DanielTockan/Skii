const express = require('express')
const router = express.Router()
const resortsController = require('./controllers/resorts')
const userController = require('./controllers/users')
const secureRoute = require('./middleware/secureRoute')

router.route('/resorts')
  .get(resortsController.getResorts)


// ! Get clarification over the purpose of this
// router.route('/resorts-proxy/:name')
//   .get(resortsController.singleProxyResort)

router.route('/resorts/:name')
  .get(resortsController.singleResort)
//   .delete(secureRoute, resortsController.removeResort)
  .put(secureRoute, resortsController.editResort)

router.route('/joinus')
  .post(userController.createUser)

router.route('/login')
  .post(userController.logInUser)

router.route('/users')
  .get(userController.getUsers)

router.route('/users/:accountId')
  .get(userController.singleUser)
  .delete(secureRoute, userController.removeUser)
  .put(secureRoute, userController.modifyUser)

router.route('/resorts/:resortId/comments')
router.route('/resorts/:name/comments')
  .post(secureRoute, resortsController.createComment)

router.route('/resorts/:name/favourite')
  .post(secureRoute, userController.addToFavourites)
router.route('/resorts/:name/favourite/:favouritename')
  .put(secureRoute, userController.deleteFromFavourites)

router.route('/resorts/:name/comments/:commentId')
  .put(secureRoute, resortsController.editComment)
  .delete(secureRoute, resortsController.deleteComment)

module.exports = router