const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(function (req, res, next) {
  req.session.name = 'Meghan'
  next()
})

app.get('/', function (req, res, next) {
  var sess = req.session

  res.send(req.session.name)
})

app.get('/login', function (req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.get('/logout', function(req, res, next){
  req.session.destroy(function(err) {
    console.log('error');
  })
  res.send('logging out no more cookies')
})

app.listen(3000)
