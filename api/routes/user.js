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


// Route: /api/v1/users/signin

router
  .post('/signin', async(req,res) => {
    try{
      const { username } = req.body
      console.debug('Req Username : ', req)
      return User.findOne({username: username})
        .then(result => {
            console.log('Resultat : ',result)
            return res.json(result)
        })
        .catch(error => {
          return res.json(error)
        })
    }catch(err){
      return err
    }
 
  })

// Route: /api/v1/users

router
  .post('/', (req, res, next) => {
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
  .get('/', async(req,res) => {
    console.log('Gest Users : ', req)
    try{
      const { username } = req
      const user = await User.findOne({username: username})
      console.log('user : ', user)
      return res.json(user)
    }catch(err){
      console.log('Error : ', err)
      return res.json(null)
    }
  })

module.exports = router
