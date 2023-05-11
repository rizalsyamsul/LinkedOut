const Controller = require('../controllers')
const router = require('express').Router()
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'source/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage: storage });

const { isLoggedIn, roleAdmin, roleUser } = require("../middlewares/auth.js");


router.get('/', roleUser, Controller.userHome) //meilhat postingan + seacrh berdasarkan keyword
router.get('/like',roleUser, Controller.userLikePost)
router.get('/dislike',roleUser, Controller.userDislikePost)
router.get('/addPost', roleUser, Controller.userAddPost)
router.post('/addPost',upload.single('image'), roleUser, Controller.userCreatePost)
router.get('/editPost/:PostId', roleUser, Controller.userEditPost)
router.post('/editPost/:PostId', roleUser, Controller.userUpdatePost)
router.get('/deletePost/:PostId', roleUser, Controller.userDeletePost)


module.exports = router