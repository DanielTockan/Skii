const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongooseHidden = require('mongoose-hidden')
const uniqueValidator = require('mongoose-unique-validator')
//hmmm

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  bio: { type: String },
  image: { type: String },
  isAdmin: { type: Boolean },
  favourites: { type: Array },
  ski_or_board: { type: String },
  favourite_region: { type: String },
  hometown: { type: String },
  experience: { type: String },
  favourite_brand: { type: String }
})

schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

schema.plugin(uniqueValidator)

schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })
schema

  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'should match')
    }
    next()
  })

schema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', schema)


//! replacing
//.pre('validate', function checkPassword(next) {
//  if (this.password !== this._passwordConfirmation) {
//    this.invalidate('passwordConfirmation', 'should match password')
//  }
//  next()
//})
//

//.pre('save', function hashPassword(next) {
//  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
//  next()
//})