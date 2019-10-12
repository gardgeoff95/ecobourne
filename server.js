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
