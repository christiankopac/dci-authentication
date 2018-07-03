var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next){
    // if user is authenticated in the session call the next() to call the next request handler
    // Passport adds this method to a request object.
    // A middleware is allowed to add properties to req and res objects
    if(req.isAuthenticated())
        return next()
    res.redirect('/);
} 


module.exports = function(passport) {
    // GET login page
    router.get('/', function(req, res, next) {
        res.render('index', {
            title: 'Auth - Login',
            message: req.flash('message')
        });
    });
    // Handle login POST
    router.post('/login', passport.authennticate('login',{
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));
    // GET registration page
    router.get('/signup', function(req, res){
        res.render('register', {
            title: 'Auth - Register',
            message: req.flash('message')
        });
    });
    // Handle registration POST
    router.post('/signup', passport.authenticate('signup'), {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    });
    // GET home page
    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', {user: req.user});
    });
    // GET logout
    router.get('/signout', function(req, res){
        req.logout();
        res.redirect('/');
    });
    return router;
}



                
