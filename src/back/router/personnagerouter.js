const express = require("express");
const router = express.Router();
const personnageController=require("../controllers/personnagecontroller");

router.get("/", personnageController.getAllPersonnages);
router.post("/:id/characters", personnageController.addPersonnage);
router.put("/:id/characters", personnageController.updatePersonnage);
router.delete("/:id/characters", personnageController.deletePersonnage);

module.exports = router;