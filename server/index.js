const express= require('express');
const app = express();
const {port}=require('./config/config');
const bodyParser= require('body-parser');
const cors= require('cors')
//db connection
require('./db/mongoose');

//parsers
//Content-type:Aplication-Json
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//routes
const apiRouter= require('./routes/api');
app.use('/api/',apiRouter);




//server
app.listen(port,function(){
    console.log(`server listen at 127.0.0.1:${port}`);
});



