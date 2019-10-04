const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lobbySchema = new Schema({
    user1: { type: String, require: true },
    user2: { type: String, require: false },
    user3: { type: String, require: false },
    user4: { type: String, require: false },
    user5: { type: String, require: false }
})

const lobby = mongoose.model("Lobby", lobbySchema);

module.exports = lobby;