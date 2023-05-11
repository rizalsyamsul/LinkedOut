const { Post, Favourite, User, Profile } = require('../models')
const bcrypt = require('bcryptjs');

class Controller {
    static userAuth(req, res) {
        let { email } = req.query
        res.render('userAuth', { email })
    }

    static register(req, res) {
        let { username, email, role, password } = req.body
        User.create({ username, email, role, password })
            .then(user => {
                res.redirect(`/?email=${user.email}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req, res) {
        let { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (user) {
                    let validatePassword = bcrypt.compareSync(password, user.password);
                    if (validatePassword) {
                        req.session.userId = user.id;
                        req.session.role = user.role;

                        if (user.role == "admin") {
                            return res.redirect('/admin');
                        } else if (user.role == "user") {
                            return res.redirect('/user');
                        }

                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/');
            }
        })
    }

    //admin
    static adminHome(req, res) {

        res.render('admin/adminHome')
    }

    static adminListuser(req, res) {

        res.render('admin/adminHome')
    }


    static adminEdituser(req, res) {

        res.render('admin/adminHome')
    }

    static adminUpdateuser(req, res) {

        res.render('admin/adminHome')
    }

    static adminDeleteuser(req, res) {

        res.render('admin/adminHome')
    }




    //user
    static userHome(req, res) {
        let posts;
        Post.findAll()
        .then(result=>{
            posts = result
            return User.findByPk(req.session.userId)
        })
        .then(user =>{
            res.render('user/userHome',{posts,user})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static userAddPost(req, res) {
        res.render('user/addPost')
    }

    static userLikePost(req,res) {

        res.send('kamu ngelike, tapi belum di simpan')
    }

    static userCreatePost(req, res) {

        res.render('user/userHome')
    }
    
    static userEditPost(req, res) {

        res.render('user/userHome')
    }

    static userUpdatePost(req, res) {

        res.render('user/userHome')
    }

    static userDeletePost(req, res) {

        res.render('user/userHome')
    }
}

module.exports = Controller