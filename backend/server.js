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
const path = require('path')

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


//-------------Deployment-------------------//
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname1, "frontend/dist")));

    app.get('/{*any}',(req,res) => {
        res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"));

    })
}else{
    app.get("/", (req,res) => {
        res.send("API is Running successfully")
    })
}

//-------------Deployment-------------------//
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
    //io.on --->used to listed registered socket
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit("connected");
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined chat', room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on('new message', (newMessageReceived)=>{
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log("chat.users not defined");

        //if we send a chat in a group it should be received by everyone in the group , except me
        chat.users.forEach((user)=> {
            if(user._id === newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        })
    });

    socket.off("setup", ()=> {
        console.log("User Disconnected");
        socket.leave(userData._id);
    })
})