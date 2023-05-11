const Controller = require('../controllers/userAuth')
const router = require('express').Router()

router.post('/register',Controller.register)
router.get('/login')

module.exports = router