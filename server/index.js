require("dotenv").config();
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
const userRoutes = require('./routes/user')
const projectRoutes=require('./routes/project')
const statsRoutes=require('./routes/stats')
const postsRoutes = require('./routes/posts')
app.use('/api/notes',apiRouter);
app.use('/api/user', userRoutes)
app.use('/api/projects',projectRoutes)
app.use('/api/stats',statsRoutes)
app.use('/api/posts',postsRoutes)

//server
app.listen(port,function(){
    console.log(`server listen at 127.0.0.1:${port}`);
});



