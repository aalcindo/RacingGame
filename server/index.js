'use strict'
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const path = require('path')

app.use(express.static(path.join(__dirname, '../client')));
app.use('assets',express.static(path.join(__dirname, '../client/assets')));
// app.get('/', function(req, res){
//     res.sendFile(path.join(__dirname, '../client/index.html'));
//   });
  


const PORT = process.env.PORT || 8000

http.listen(PORT, function(){
    console.log('listening on *: '+PORT);
  });

// app.use(cors())
const players = {}

io.on('connection', socket => {
    console.log("player connected");
  // When a player connects
  socket.on('new-player', state => {
    console.log('New player joined with state:', state)
    players[socket.id] = state
    // Emit the update-players method in the client side
    io.emit('update-players', players)
  })

  socket.on('disconnect', state => {
    delete players[socket.id]
    io.emit('update-players', players)
  })

  // When a player moves
  socket.on('move-player', data => {
    const { x, y, angle, playerName, speed } = data

    // If the player is invalid, return
    if (players[socket.id] === undefined) {
      return
    }

    // Update the player's data if he moved
    players[socket.id].x = x
    players[socket.id].y = y
    players[socket.id].angle = angle
    players[socket.id].playerName = {
      name: playerName.name,
      x: playerName.x,
      y: playerName.y
    }
    players[socket.id].speed = {
      value: speed.value,
      x: speed.x,
      y: speed.y
    }

    // Send the data back to the client
    io.emit('update-players', players)
  })
})