const router = require('express').Router()
const userController = require('../controllers/userController')
const { uploads } = require('../middleware/imgStorage')
const valid = require('../middleware/auth_middleware')
const validate = require('../validations/userValidation')

router.post('/user_registration', uploads.single('profilePic'), validate.registerUserValidation, userController.userSignUp);
router.post('/user_login', validate.userLoginValidation, userController.userLogin)
router.put('/update_user_profile', uploads.single('profilePic'), userController.updateUserProfile);

router.post('/checkUser', valid, userController.userLogin)


module.exports = router;
