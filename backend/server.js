const express = require('express')
const dotenv = require('dotenv')
const chats = require('./data')
const cors = require('cors')
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB()

app.use(cors());

app.use(express.json())  //to accept json data

app.get('/',(req,res) => {
    res.send('API is RUNNING')
})

// app.get('/api/chat',(req,res) => {
//     res.send(chats)
// })

// app.get('/api/chat/:id', (req,res) => {
//     const singleChat = chats.find(chat => chat._id === req.params.id)
//     res.send(singleChat)
// })

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use("/api/message", messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=>{
    console.log(`SERVER STARTED ON PORT ${PORT}`.yellow.bold)
})

const io = require("socket.io")(server,{
    pingTimeout: 60000,
    cors:{
        origin: "http://localhost:5173",
    },

});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
})