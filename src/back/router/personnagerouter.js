const express = require("express");
const router = express.Router();
const personnageController=require("../controllers/personnagecontroller");

router.get("/", personnageController.getAllPersonnages);
router.post("/add", personnageController.addPersonnage);
router.put("/update", personnageController.updatePersonnage);
router.delete("/delete", personnageController.deletePersonnage);

module.exports = router;