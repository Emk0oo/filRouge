const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messagecontroller");

router.get("/", messageController.getMessage);
router.post("/new", messageController.addMessage);


module.exports = router;