const User = require('../models/User')

function newUser(req) {
  console.log('Helper user : ', req)
  const newUser = new User({
    username: req.body.username,
    email : req.body.email,
    password: req.body.password
  })
  return newUser.save()
}


module.exports = {
  newUser
}