const Controller = require('../controllers')
const router = require('express').Router()

router.get('/login',Controller.userAuth)
router.post('/register',Controller.register)
router.post('/login',Controller.login)
router.get('/loguot',Controller.logout)

module.exports = router