const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const { newUser, generateJWT } = require('../controllers/User');


// Register User
// POST http://localhost:3349/api/users
router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('username', 'Please add username').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            try {
                const { name, username, email, password } = req.body; //inputed by user

                const user = await newUser({
                    name,
                    username,
                    email,
                    password
                });

                const payload = {
                    user: {
                        id: user.id
                    }
                };

                let token = await generateJWT(payload);

                res.json({ token });
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        } else return res.status(400).json({ err: true, errors: errors.array() });
    })

module.exports = router;