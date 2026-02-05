const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
const { MONGODB_URI_PROD } = process.env;

app.use(cors);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.use('/api', indexRouter);

const mongoURI = MONGODB_URI_PROD;
// 최신 버전 db 드라이브에선 useNewUrlParser, useUnifiedTopology 옵션이
// 기본값으로 설정되어 있어서 별도 지정이 불필요함
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});    
