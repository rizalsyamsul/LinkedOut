const {Post,Favourite,User,Profile} = require('../models')
const bcrypt = require('bcryptjs');

class Controller{
    static userAuth(req,res){
        let {email} = req.query
        res.render('userAuth',{email})
    }

    static register(req,res){
        let {username,email,role,password} = req.body
        User.create({username,email,role,password})
        .then(user=>{
            res.redirect(`/?email=${user.email}`)
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static login(req,res){
        let {email,password} = req.body
        User.findOne({
            where:{
                email
            }
        })
        .then(user =>{
            if(user){
                let validatePassword = bcrypt.compareSync(password, user.password);
                if(validatePassword){
                    return res.render('Homepage',{user})
                }
            }
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = Controller