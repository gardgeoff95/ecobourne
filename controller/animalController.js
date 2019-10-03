const db = require("../models");

module.exports = {
    findAll: function(req, res){
        db.animal.find(req.query)
            .then(dbAnimal => res.json(dbAnimal))
            .catch(err => res.status(422).json(err));
    }
    ,
    findById: function(req, res){
        db.animal.find(req.params.id)
        .then(dbAnimal => res.json(dbAnimal))
        .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        db.animal.create(req.body)
        .then(dbAnimal => res.json(dbAnimal))
        .catch(err => res.status(422).json(err))
    },
    update: function(req, res){
        db.animal.findOneAndUpdate({ id: req.params.id }, req.body)
        .then(dbAnimal => res.json(dbAnimal))
        .catch(err => res.status(422).json(err))
    },
    delete: function(req, res){
        db.animal.findById(req.params.id)
        .then(dbAnimal => dbAnimal.remove())
        .then(dbAnimal => res.json(dbAnimal))
        .catch(err => res.status(422).json(err))
    }
}