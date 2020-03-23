const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);    
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post(
    '/',
    [
        check('text', 'Please Add a Text')
            .not()
            .isEmpty(),
        check('amount', 'Please Add the amount')
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { text, amount } = req.body;

        try {
            const newTransaction = new Transaction({
                text,
                amount
            });

            const transaction = await newTransaction.save();

            res.json(transaction);
        } 
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }

);

module.exports = router;