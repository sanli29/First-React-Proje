const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth'); //middleware next()

const { check, validationResult } = require('express-validator');

const { getSales, newSale } = require('../controllers/Sale');

router.get('/', auth, async (req, res) => {
    try {
        const sales = await getSales();
        res.json(sales);
    } catch (err) {
        res.json({
            err: true,
            message: 'Server error',
            result: err
        })
    }
})

module.exports = router;