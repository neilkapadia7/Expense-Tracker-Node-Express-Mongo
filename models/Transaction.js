const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('transaction', TransactionSchema);