const Controller = require('../controllers')
const router = require('express').Router()

const { isLoggedIn, roleAdmin, roleUser } = require("../middlewares/auth.js");


router.get('/', roleUser, Controller.userHome) //meilhat postingan + seacrh berdasarkan keyword
router.get('/addPost', roleUser, Controller.userAddPost)
router.post('/addPost', roleUser, Controller.userCreatePost)
router.get('/editPost/:UserId', roleUser, Controller.userEditPost)
router.post('/editPost/:UserId', roleUser, Controller.userUpdatePost)
router.post('/deletePost/:UserId', roleUser, Controller.userDeletePost)


module.exports = router