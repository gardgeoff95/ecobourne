const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
const io = require("socket.io")(http);

//Middleware things?
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//I think this is the stuff that should render react? --Jamie
if (process.env.NODE_ENV === "dev") {
  app.use(express.static("client/build"));
}

///////////////////////////////////////////
//Socket Stuff
///////////////////////////////////////////

var users = [];
//Connects
io.on("connection", function(socket) {
  // console.log("a user connected");

  //Sends a chat message
  socket.on("chat message", function(msg) {
    console.log("My Chat Message listener", msg);

    io.emit("chat message", msg);
  });
  //Deals with user name
  socket.on("user listener", function(nickname) {
    socket.nickname = nickname;
    users.push(socket.nickname);

    console.log("Users", users);
    io.emit("user listener", users);
  });
  //Shows that user disconnects
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
