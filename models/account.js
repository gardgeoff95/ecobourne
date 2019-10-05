const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    created: {
        type: Date,
        default: Date.now
    }
});

const account = mongoose.model("Account", accountSchema);

module.exports = account;