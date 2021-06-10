const bcryot = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

// New (registration page)

// Create (registration route)
userRouter.post('/', (req, res) => {
    req.body.password = bcryot.hashSync(req.body.password, bcryot.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        res.redirect('/');
    });
});




// Export User Router
module.exports = userRouter;