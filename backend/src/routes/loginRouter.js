let express = require('express');
let app = express();
let loginRouter = express.Router();

let Login = require('../models/Login');

loginRouter.route('/add/post').post(function(req,res){
    let login = new Login(req.body);
    login.save()
        .then(login=> {
            res.json(login._id);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

loginRouter.route('/').get(function(req,res){
    Login.find(function(err,logins){
        if(err){
            console.log(err);
        }
        else{
            res.json(logins);
        }
    });
});

loginRouter.route('/edit/:id').get(function(req,res){
    let id = req.params.id;
    Login.findById(id, function(err,login){
        res.json(login);
    });
});

loginRouter.route('/update/:id').post(function(req,res){
    Login.findById(req.params.id, function(err, login){
        if (!login)
            return next(new Error('Could not load Document'));
        else {
            login.email = req.body.name;
            login.password = req.body.banner;
            login.save().then(login => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

loginRouter.route('/delete/:id').get(function(req,res) {
    Login.findByIdAndRemove({_id: req.params.id},
        function(err,login){
            if(err) res.json(err);
            else res.json('Successfully removed.');
        });
});

loginRouter.route('/count').get(function(req,res) {
    Login.count(function(err,count){
        if(err) res.json(err);
        else res.json(count);
    })
});

module.exports = loginRouter;