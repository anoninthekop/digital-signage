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
      const { username, password } = req.body

      return User.findOne({username: username})
        .then(async (user) => {
          if (user){
            console.log ('Route signin : ', user, 'Pass : ', password)
            const isValid = await user.comparePassword(password, user.password)
            console.log('IsValid : ', isValid)
            if(!isValid) throw new Error()
            return res.json(user)
          }
          throw new Error()
        })
        .catch((err) => {
          return res.json({error:'User not Found'})
        })
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
    .then((user) => {
      if(user){
      console.log('Res : ',user)
      return res.json(user)
      }
      throw new Error()
    })
    .catch((err)=>{
      console.log('Error : ',err)
      return res.json({error:err})
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
