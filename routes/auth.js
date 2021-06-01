const express = require('express');

const auth = require('../middlewares/auth'); //middleware next()

const { check, validationResult } = require('express-validator');

// From User.js
const User = require('../models/User'); //Mongoose
const { getUserById, authenticate } = require('../controllers/User');

const router = express.Router();

// Get logged in user (postman)
// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await getUserById(req.user.id); //select without password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login User (Auth)  (postman)
// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
    '/',
    [
        // validation
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // If there is error on checking req
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const { email, password } = req.body;
                const token = await authenticate(email, password);

                res.json({ token });
            } catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        } else return res.status(400).json({ errors: errors.array() });
    }
);

module.exports = router;
