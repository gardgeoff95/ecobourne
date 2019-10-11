const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const accountSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    created: {
        type: Date,
        default: Date.now
    }
});

// Authenticate input on database
accountSchema.statics.authenticate = function(username, password, cb){
    account.findOne({ username : username })
    .exec(function(err, user){
        if(err){
            return cb(err)
        } else if (!user){
            var err = new Error("Account not found");
            err.status = 401;
            return cb(err);
        }
        bcrypt.compare(password, user.password, function(err, res){
            if(res === true){
                return cb(null, user);
            } else{
                return cb();
            }
        })
    });
}


accountSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    })
})

const account = mongoose.model("Account", accountSchema);

module.exports = account;