'use strict';


var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var Message = mongoose.model('Message', {
  name: String,
  message: String
})

var dbUrl = 'mongodb+srv://thanhdo:Aa123456@cluster0.10buw.mongodb.net/socket_sample?retryWrites=true&w=majority'
app.get('/test', (req, res) => {
  res.status(200).send("Thanks")
})
app.get('/health', async function (req, res) {
  return res.status(200).send("Server is working")
})

io.on('connection', (socket) => { 
  console.log("New client connected", socket.id);
  socket.on("clientSendMessage", (data) => {
    console.log("Server receieve message", data);
  })

 });
http.listen(3000);

//Assign port
const port = process.env.PORT || 5001;
// Launch app to the specified port
app.listen(port, function () {
  console.log("Running APIs on Port " + port);
});

// const express = require('express');
// const { Server } = require('ws');

// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new Server({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.on('close', () => console.log('Client disconnected'));
// });


// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);
