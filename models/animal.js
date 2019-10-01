const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    race: { type: String, required: true },
    number: { type: int, required: true }
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;