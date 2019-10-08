const db = require("../models");

module.exports = {
    findAll: function(req, res){
        // res.send('hello')
        db.account.find(req.query)
        .then(dbAccount => res.json(dbAccount))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res){
        // console.log(req.params.id);
        db.account.findById(req.params.id)
        .then(dbAccount => res.json(dbAccount))
        .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        db.account.create(req.body)
        .then(dbAccount => res.json(dbAccount))
        .catch(err => res.status(422).json(err))
    },
    update: function(req, res){
        db.account.findOneAndUpdate({ id: req.params.id }, req.body)
        .then(dbAccount => res.json(dbAccount))
        .catch(err => res.status(422).json(err))
    },
    delete: function(req, res){
        db.account.findById(req.params.id)
        .then(dbAccount => res.json(dbAccount))
        .then(dbAccount => res.json(dbAccount))
        .catch(err => res.status(422).json(err))
    }
}
