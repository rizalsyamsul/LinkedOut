const router = require('express').Router()
const Controller = require('../controllers/userAuth')
const userAuthRoute = require('./userAuth')

router.get('/',Controller.userAuth)
router.use('/userAuth',userAuthRoute)

module.exports = router