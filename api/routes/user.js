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

router.post('/', (req, res) => {
  //return User.create(req.body)
  console.log('Post Users : ',req)
  
  const user = new User(req)
  user.save()
    .then(resp => {
      return (resp) ? res.json({succes:true, res:resp}) : res.json({succes:false})
    })
})

module.exports = router
