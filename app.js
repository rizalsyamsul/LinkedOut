const express = require('express')
const app = express()
const router = require('./routes')
const session = require('express-session')
const port = 3000

app.set('view engine','ejs')
app.use(express.static('source'))
app.use('/style',express.static('style'))
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}));

app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})