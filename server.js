const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const routes = require("./routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

var PORT = process.env.PORT || 3001;
var app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecobourne",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

var db = mongoose.connection;
db.on("erro", console.error.bind(console, "connection error"));
db.once("open", function() {});

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

///////////////////////////////////////////
//Socket Stuff
///////////////////////////////////////////

var users = [];
var socketIds = [];
//Connects
io.on("connection", function(socket) {
  // console.log("a user connected");
  console.log("My socket id", socket.id);
  //Sends a chat message
  socket.on("chat message", function(msg) {
    console.log("My Chat Message listener", msg);

    io.emit("chat message", msg);
    if (msg.msg == "!help") {
      let serverHelp = {
        user: "Command",
        msg:
          "!bunny-yellow        -      !bunny-yellow      -       !bunny-blue        -         !bunny-pink        -      !bunny-brown       -        !fox-left         -      !fox-right"
      };
      io.emit("chat message", serverHelp);
      // if (msg.msg == "!help") {
      //   let serverHelp1 = {
      //     user: "Command",
      //     msg: "!bunny-yellow"
      //   };
      //   let serverHelp2 = {
      //     user: "Command",
      //     msg: "!bunny-blue"
      //   };
      //   let serverHelp3 = {
      //     user: "Command",
      //     msg: "!bunny-pink"
      //   };
      //   let serverHelp4 = {
      //     user: "Command",
      //     msg: "!bunny-brown"
      //   };
      //   let serverHelp5 = {
      //     user: "Command",
      //     msg: "!fox-left"
      //   };
      //   let serverHelp6 = {
      //     user: "Command",
      //     msg: "!fox-right"
      //   };

      //   io.emit("chat message", serverHelp1);
      //   io.emit("chat message", serverHelp2);
      //   io.emit("chat message", serverHelp3);
      //   io.emit("chat message", serverHelp4);
      //   io.emit("chat message", serverHelp5);
      //   io.emit("chat message", serverHelp6);
    }
  });

  //Deals with user name
  socket.on("user listener", function(nickname) {
    socket.nickname = nickname;
    users.push(socket.nickname);
    socketIds.push(socket.id);

    console.log("Users", users);
    console.log("socketIDS", socketIds);
    io.emit("user listener", users);
  });
  //Shows that user disconnects
  socket.on("disconnecting-user", function(data) {
    console.log("HEIRABIDJNAKJNSDK", data);
    users.pop(data);
  });

  socket.on("disconnect", function() {
    console.log("User discconected", socket.id);
    let indexToPop = socketIds.indexOf(socket.id);
    socketIds.pop(indexToPop);
    users.pop(indexToPop);
    io.emit("user listener", users);
  });
});

http.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
