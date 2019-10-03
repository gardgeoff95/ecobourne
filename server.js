const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const io = require("socket.io");
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware things?
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//I think this is the stuff that should render react? --Jamie
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

///////////////////////////////////////////
//Socket Stuff
///////////////////////////////////////////

var users = [];
//Connects
io.on("connection", function(socket) {
  console.log("a user connected");

  //Sends a chat message
  socket.on("chat message", function(msg) {
    console.log("My Chat Message listener", msg);

    io.emit("chat message", msg);
  });
  //Deals with user name
  socket.on("send-nickname", function(nickname) {
    socket.nickname = nickname;
    users.push(socket.nickname);
    console.log(users);
  });
  //Shows that user disconnects
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
