var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var newSchema = new Schema({
    accounts: {
        type: Schema.Types.ObjectId,
        ref: "account"
    },
    animals: {
        type: Schema.Types.ObjectId,
        ref: "animal"
    }
});

var newArticles = mongoose.model("NewArticles", newSchema);

module.exports = newArticles;