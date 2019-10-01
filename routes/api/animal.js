const router = require("express").Router();
const animalController = ("../../controller/animalController");

router.route("/")
    .get(animalController.findAll)
    .post(animalController.create);

router.route("/:id")
    .get(animalController.findById)
    .put(animalController.update)
    .delete(animalController.remove);

module.exports = router;