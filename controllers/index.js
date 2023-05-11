const { Post, Favourite, User, Profile } = require('../models')
const bcrypt = require('bcryptjs');
const dateFormatted = require('../helpers/dateFormatted')

class Controller {
    static home(req, res) {

    }


    static userAuth(req, res) {
        let { email, error } = req.query
        res.render('userAuth', { email, error })
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
            },
            include: Profile
        })
            .then(user => {
                if (user) {
                    let validatePassword = bcrypt.compareSync(password, user.password);
                    if (validatePassword) {
                        req.session.userId = user.id;
                        req.session.role = user.role;

                        if (user.role == "admin") {
                            if (!user.Profile) {
                                return res.render('addProfile', {user})
                            } else {
                                return res.redirect('/admin');
                            }
                        } else if (user.role == "user") {
                            if (!user.Profile) {
                                return res.render('addProfile', {user})
                            } else {
                                return res.redirect('/user');
                            }
                        }
                        // return res.render('Homepage',{user})

                    }else {
                        const error = "Invalid email / password";
                        return res.redirect(`/?error=${error}`);
                    }
                }else {
                    const error = "Invalid email / password";
                    return res.redirect(`/?error=${error}`);
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
        let adminId = req.session.userId
        let dataAdmin

        let {sort} = req.query
        User.findByPk(adminId)
            .then((data) => {
                dataAdmin = data
                return User.findByRole(sort,Profile)
            })
            .then((user) => {
                // res.send(user)
                res.render('admin/adminHome', { dataAdmin, user, dateFormatted })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static adminEdituser(req, res) {
        let adminId = req.session.userId
        let { userId } = req.params
        let dataAdmin
        User.findByPk(adminId)
            .then((data) => {
                dataAdmin = data
                return User.findByPk(userId, {
                    include: { model: Profile, required: true }
                })
            })
            .then((user) => {
                // res.send(user)
                res.render('admin/adminEditUser', { dataAdmin, user, dateFormatted })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static adminUpdateuser(req, res) {
        let { username, email, role, fullName, location, job, company } = req.body
        let { userId } = req.params

        User.update({ username, email, role }, {
            where: { id: userId }
        })
            .then(() => {
                return Profile.update({ fullName, location, job, company }, {
                    where: { UserId: userId }
                })
            })
            .then(() => {
                res.redirect('/admin/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static adminDeleteuser(req, res) {
        let { userId } = req.params
        Profile.destroy({ where: { UserId: userId } })
            .then(() => {
                return User.destroy({ where: { id: userId } })
            })
            .then(() => {
                res.redirect('/admin/')
            })
            .catch(err => {
                res.send(err)
            })
    }


    static userAddProfile(req, res) {
        
    }

    static userCreateProfile(req, res) {
        let { UserId } = req.params
        let { fullName, location, job, company, profilePicture } = req.body
        Profile.create({fullName, location, job, company, UserId})
        .then(()=>{
            return User.findByPk(UserId)
        })
        .then((data)=>{
            if (data.role == 'admin') {
                res.redirect('/admin') 
            } else if (data.role == "user") {
                res.redirect('/user')
            }
        })
        .catch(err =>{
            if (err.name === "SequelizeValidationError") {
                const errors = err.errors.map(err => err.message)
                res.redirect(`/addPofile/${UserId}?error=${errors}`);
            } else res.send(err);
        })
    }

    //user
    static userHome(req, res) {
        res.send('iniuser')
    }

    static userAddPost(req, res) {

        res.render('user/userHome')
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