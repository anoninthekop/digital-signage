const routes = require('next-routes')

//TODO : erase with dynamic route NextJS
module.exports = routes()
  .add('/slideshow/:id', 'slideshow')
  .add('/display/:display', 'display')
