const express = require('express')
const router = express.Router()
const User = require('../models/User')

/**
router.get('/demo', function(req, res) {
  User.register(new User({ username: 'demo' }), 'demo', function() {
    res.redirect('/')
  })
})
*/
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

// Route: /api/v1/users

router.post('/', (req, res, next) => {
  console.log('Post', req.body)
  const user = new User({
    username: req.body.user.username,
    email: req.body.user.email,
    password: req.body.user.password
  })
  return user
    .save()
    .then((res) => {
      console.log('Res : ',res)
      return res.json({succes:true})
    })
    .catch((err)=>{
      console.log('Error : ',err)
    })
})

module.exports = router
