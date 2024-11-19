const router = require('express').Router();
let User = require('../models/user.model');

// GET all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))  // Send the users as JSON response
        .catch(err => res.status(400).json('Error: ' + err));  // Handle any errors
});

// Create a new user 
router.route('/add').post((req, res) => {
    const { username } = req.body;  // Get the username from the request body

    const newUser = new User({
        username,
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
