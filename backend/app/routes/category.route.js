const express = require("express");
const category = require("../controllers/category.controller");

const router = express.Router();

router.route("/")
    .get(category.findAll)
    
    .delete(category.deleteAll);

router.route("/add")
    .post(category.create)

router.route("/:id")
    .get(category.findOne)
    .put(category.update)
    .delete(category.delete);

module.exports = router;