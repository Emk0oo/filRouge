const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messagecontroller");

// router.get("/", messageController.getMessages);
router.get("/:idUser/messages", messageController.getMessagesByIdUser);
router.post("/:idUser/messages", messageController.addMessage);


module.exports = router;