const express = require('express');
const app = express();
const http = require('http'); // Fix: require http module
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => { // Fix: "connection" instead of "connetion"
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);

        socket.on("send_message", (data) => {
            socket.to(data.room).emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            console.log(`User Disconnected: ${socket.id}`);
        });
    }); // Fix: Closing parenthesis for socket.on("join_room")

});

server.listen(3001, () => {
    console.log("Server Running");
}); // Fix: Closing parenthesis for server.listen
