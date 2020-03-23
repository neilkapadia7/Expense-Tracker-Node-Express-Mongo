const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false}));

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the Expense Tracker API!'});
})

app.use('/api/transaction', require('./routes/expense'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port Number: ${PORT}`));