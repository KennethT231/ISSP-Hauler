const express = require('express');
const serviceProviderController = require('../controllers/serviceProvider-controller')
const router = express.Router();
const { checkUserRole } = require('../middleware/auth');

router.get('/', checkUserRole('serviceProvider'), serviceProviderController.getServiceProvider);
router.get('/:uid', checkUserRole('serviceProvider'), serviceProviderController.getOneServiceProvider);
router.post('/', serviceProviderController.createServiceProvider); // No role check for service provider creation
router.delete('/:uid', checkUserRole('serviceProvider'), serviceProviderController.deleteOneServiceProvider);
router.post('/:uid', checkUserRole('serviceProvider'), serviceProviderController.updateOneServiceProvider);
router.post('/verify/2FA', checkUserRole('serviceProvider'), serviceProviderController.verifyProvider);

module.exports = router;

