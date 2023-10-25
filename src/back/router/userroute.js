const express = require("express");
const router = express.Router();
const userController = require("../controllers/utilisateurcontroller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/add", userController.addUser);
router.put("/update/:id", userController.updateUser);

const messageRouter= require('./messagecontroller');
router.use('/:id/messages', messageRouter);

module.exports = router;