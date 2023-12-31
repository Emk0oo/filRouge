const express = require("express");
const router = express.Router();
const universController = require("../controllers/universcontroller");

router.get("/", universController.getAllUnivers);
router.post("/add", universController.addUnivers);
router.get("/:id", universController.getUniversById);
router.put("/:id/update/", universController.updateUnivers);
router.delete("/delete/:id", universController.deleteUnivers);

const personnageRouter = require("./personnagerouter");
router.use("/:id/characters", personnageRouter);

module.exports = router;