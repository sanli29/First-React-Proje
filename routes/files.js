const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth'); //middleware next()

const { check, validationResult } = require('express-validator');

const { getFiles, newFile } = require('../controllers/File');

router.get('/', auth, async (req, res) => {
    try {
        const files = await getFiles();
        res.json(files);
    } catch (err) {
        res.json({
            err: true,
            message: 'Server error',
            result: err
        })
    }
})

router.post('/', [auth, [
    check('name', 'Please add name').not().isEmpty(),
    check('extention', 'Please add extention').not().isEmpty(),
    check('data', 'Please add data').not().isEmpty()]
    //check('columns', 'Please add columns').not().isEmpty(),
], async (req, res) => {

    console.log(req.body);

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const { name, extention, data, columns, type } = req.body; //inputed by user

            const file = await newFile({
                name,
                extention,
                data,
                columns,
                type
            });

            res.json(file);

        } catch (err) {
            console.log("HATAYI YAZIYO");
            console.log(err);
            console.error(err.message);
            res.status(500).send('Server error');
        }
    } else return res.status(400).json({ err: true, errors: errors.array() });
});

module.exports = router;