const express = require('express');
const userController = require('../controllers/user-controller')
const router = express.Router();
const { checkUserRole } = require('../middleware/auth');

router.post('/verify/2FA', checkUserRole('user'), userController.verifyUser);
router.get('/', checkUserRole('user'), userController.getUser);
router.post('/', userController.createUser); // No role check for user creation
router.get('/:uid', checkUserRole('user'), userController.getOneUser);
router.delete('/:uid', checkUserRole('user'), userController.deleteOneUser);
router.post('/:uid', checkUserRole('user'), userController.updateOneUser);

module.exports = router;