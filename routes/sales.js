const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth'); //middleware next()

const { check, validationResult } = require('express-validator');

const { getSales, newSale } = require('../controllers/Sale');

const { formatQuery } = require('../helpers/formatting');


router.get('/', auth, async (req, res) => {
    try {
        console.log(req.query);
        let q = await formatQuery(req.query.find);
        const sales = await getSales(q);
        res.json(sales);
    } catch (err) {
        res.status(err.status).json(err);
    }
})

module.exports = router;