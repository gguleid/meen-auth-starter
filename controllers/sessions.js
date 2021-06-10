// Dependencies
const express = require('express');
const bcryot = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');
const session = require('express-session');

// New (login page)
sessionsRouter.get('/new', (req, res) => {
	res.render('sessions/new.ejs', {
		currentUser: req.session.currentUser
	});
});

// Delete (logout route)
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
})

// Create (login route - works when login page form is submitted)
sessionsRouter.post('/', (req, res) => {
    // checking for existing user
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        // error message
        if (!foundUser) {
            res.send(`Oops! No user with that email address has been registered.`);
        } else {
            // If a user has been found. Compare passwords
            const passwordMatches = bcryot.compareSync(req.body.password, foundUser.password);

            // if passwords match
            if (passwordMatches) {
                // add user to our session
                req.session.currentUser = foundUser;
                // redirect back to our home page
                res.redirect('/');
            } else {
                // if it doesn't match passwords
                res.send(`Oops! Invalid credentials.`);
            }
        }

    });
});


// Export Sessions Router
module.exports = sessionsRouter;