const router = require('express').Router()
const Controller = require('../controllers')
const userAuthRoute = require('./userAuth')
const admin = require('./admin')
const user = require('./user')

const { isLoggedIn, roleAdmin, roleUser } = require("../middlewares/auth.js");

router.get('/',Controller.userAuth)
router.use('/userAuth',userAuthRoute)

router.use(isLoggedIn)

router.use('/admin',admin)
router.use('/user',user)


module.exports = router