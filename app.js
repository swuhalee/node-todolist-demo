const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const app = express();
const { MONGODB_URI_PROD } = process.env;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.use('/api', indexRouter);

const mongoURI = MONGODB_URI_PROD;
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});