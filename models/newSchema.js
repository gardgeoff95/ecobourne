var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var newSchema = new Schema({
    accounts: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    animals: {
        type: Schema.Types.ObjectId,
        ref: "Animal"
    }
});

var NewArticles = mongoose.model("NewArticles", newSchema);

module.exports = NewArticles;