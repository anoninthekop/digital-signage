/* eslint-disable multiline-comment-style */
const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const { Server} = require('socket.io')
const dbConnect = require('./lib/db/dbConnect')

const Keys = require('./keys')

const dev = Keys.ENVIRON !== 'PROD'
const app = next({ dev })
/*
const routes = require('./routes')
*/
const handle = app.getRequestHandler()


const apiRoutes = require('./api/routes')

app
  .prepare()
  .then(() => {
    const server = express()

    // Allows for cross origin domain request:
    server.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })

    // MongoDB
    dbConnect()

    // Parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }))
    // Parse application/json
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    // Parse cookies
    server.use(cookieParser())
    // Sessions
    server.use(
      session({
        secret: Keys.SESSION_SECRET,
        resave: true,
        saveUninitialized: false
      })
    )

    let io
    server.use(function(req, res, next) {
      res.io = io
      next()
    })

    // API routes
    server.use('/api/v1', apiRoutes)

    // Static routes
    server.use('/uploads', express.static('uploads'))

    // Next.js routes
    // Post for next-auth callbacks
    
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.post('*', (req, res) => {
      return handle(req, res)
    })
    

    const finalServer = server.listen(Keys.PORT, err => {
      if (err) throw err
      // eslint-disable-next-line
      console.log('> Ready on http://localhost:' + Keys.PORT)
    })

    // Socket.io
    io = new Server(finalServer)
  })
  .catch(ex => {
    // eslint-disable-next-line
    console.error(ex.stack)
    process.exit(1)
  })
