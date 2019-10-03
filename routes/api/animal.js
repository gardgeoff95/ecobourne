const router = require("express").Router();
const animalController = require("../../controller/animalController");

router.route("/")
// .get(function(req,res){
//     res.send({message:'TODO: return all posts'});
//     })
    .get(animalController.findAll)
    .post(animalController.create);

router.route("/:id")
// .get(function(req,res){
//     res.send({message:'TODO: return all posts'});
//     })
    .get(animalController.findById)
    .put(animalController.update)
    .delete(animalController.delete);

module.exports = router;