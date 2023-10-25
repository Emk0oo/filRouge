const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messagecontroller");

// router.get("/", messageController.getMessages);
router.get("/", messageController.getMessage);
router.post("/", messageController.addMessage);


module.exports = router;