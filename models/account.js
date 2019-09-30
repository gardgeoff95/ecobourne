const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    animals: {
        type: String,
        required: false,
        petName: {
            
        }
    }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;