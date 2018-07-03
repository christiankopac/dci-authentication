var login = require('./login');
var signup = require('./signup');
var User = require('../models/User');

module.exports = function(passport){
    // Passport needs to be able to serialize and deserialize user to support persistent login sessions
    passport.serializeUser(function(user, done){
        console.log('serializing user: '+user);
        done(null, user._id);
    });
    passport.deserializeUser(function(user, done){
        User.findById(id, function(err, user) {
            console.log('deserializing user: '+user);
            done(err, user);
        });
    });

    // setting up passport strategies for login/signup
    login(passport);
    signup(passport);
}
