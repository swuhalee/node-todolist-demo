const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();
var whitelist = ['http://localhost:3000'] 
var corsOptions = {  
      origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {      
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
             }
      } }
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use('/api', indexRouter);

const mongoURI = 'mongodb://localhost:27017/todo-demo';
// 최신 버전 db 드라이브에선 useNewUrlParser, useUnifiedTopology 옵션이
// 기본값으로 설정되어 있어서 별도 지정이 불필요함
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});    
