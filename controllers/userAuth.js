const {Post,Favourite,User,Profile} = require('../models')

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
}

module.exports = Controller