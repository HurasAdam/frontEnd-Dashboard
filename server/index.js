require("dotenv").config();
const express= require('express');
const app = express();
const {port}=require('./config/config');
const bodyParser= require('body-parser');
const cors= require('cors')
const {Server}= require('socket.io')

//db connection
require('./db/mongoose');

//parsers
//Content-type:Aplication-Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//routes
const apiRouter= require('./routes/api');
const userRoutes = require('./routes/user')
const projectRoutes=require('./routes/project')
const statsRoutes=require('./routes/stats')
const postsRoutes = require('./routes/posts')
const optionsRoutes= require('./routes/options')
app.use('/api/notes',apiRouter);
app.use('/api/user', userRoutes)
app.use('/api/projects',projectRoutes)
app.use('/api/stats',statsRoutes)
app.use('/api/posts',postsRoutes)
app.use('/api/options',optionsRoutes)
//server
const server= app.listen(port,function(){
    console.log(`server listen at 127.0.0.1:${port}`);
});


const io = new Server(server,{
    cors:"http://localhost:3000",
    methods:["GET","POST","PATCH","DELETE"],
})

io.on("connection",(socket)=>{
    console.log(`CONNECTED SocketID:${socket.id}`)
})
app.set("socketio", io);