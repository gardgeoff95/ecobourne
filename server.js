const express = require("express");
const mongoose = require("mongoose");

// this causes error
const routes = require("./routes");

var PORT = process.env.PORT || 3001;
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/ecobourne",
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

app.listen(PORT, () =>
    console.log(`API Server now listening to PORT ${PORT}`)
);