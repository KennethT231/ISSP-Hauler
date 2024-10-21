const express = require('express');
const userController = require('../controllers/user-controller')
const router = express.Router();

router.post('/verify/2FA', userController.verifyUser)
router.get('/', userController.getUser);
router.post('/', userController.createUser);
router.get('/:uid', userController.getOneUser);
router.delete('/:uid', userController.deleteOneUser);
router.post('/:uid', userController.updateOneUser);
router.get('/type/:userType', userController.getUsersByType); //filters user by type


module.exports = router;