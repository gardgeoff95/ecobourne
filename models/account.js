const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const accountSchema = new Schema({
    email : {type: String, required : true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    // login: { type: String, required: true },
    created: {
        type: Date,
        default: Date.now
    }
});

// Authenticate input on database
accountSchema.statics.authenticate = function(email, password, cb){
    console.log('AUTHENTICATE')
    account.findOne({ email : email })
    .exec(function(err, user){
        if(err){
            console.log('Error Authenticate func', err)
            return cb(err)
        } else if (!user){
            var err = new Error("Account not found");
            err.status = 401;
            return cb(err);
        }


        console.log('BEFORE BCRYPT')
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