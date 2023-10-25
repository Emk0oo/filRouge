const express = require("express");
const router = express.Router();
const personnageController=require("../controllers/personnagecontroller");

router.get("/", personnageController.getAllPersonnages);
router.post("/add", personnageController.addPersonnage);
router.put("/:idCharacter/update", personnageController.updatePersonnage);
router.delete("/:idCharacter/delete", personnageController.deletePersonnage);

module.exports = router;