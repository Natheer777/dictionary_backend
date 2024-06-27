const express = require('express');
const UserController = require('../Controllers/Usecontroller');
const router = express.Router();

router.get('/allusers', UserController.getAllUsers);
router.post('/allWords', UserController.searchWords);
router.post('/addusers', UserController.addUser);
router.post('/delete', UserController.deleteUser);
router.post('/edite', UserController.editUser);
router.post('/insertWords', UserController.insertWords);

module.exports = router;
