const Controller = require('../controllers')
const router = require('express').Router()

const { isLoggedIn, roleAdmin, roleUser } = require("../middlewares/auth.js");
//admin

router.get('/', roleAdmin, Controller.adminHome) // melihat user doang sorting berdasarkan postingan paling banyak
router.get('/listuser/:userId/edit', roleAdmin, Controller.adminEdituser) 
router.post('/listuser/:userId/edit', roleAdmin, Controller.adminUpdateuser)
router.get('/listuser/:userId/delete', roleAdmin, Controller.adminDeleteuser) 

module.exports = router