const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    race: { type: String, required: true },
    number: { type: Number, required: true }
});

const animal = mongoose.model("Animal", animalSchema);

module.exports = animal;