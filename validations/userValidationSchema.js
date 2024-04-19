
const joi = require('@hapi/joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
const { userLogin } = require('../controllers/userController')

const schema  = {
    registerUser: joi.object({
        userName: joi.string().max(20).required(),
        email: joi.string().email().required(),
        password: joiPassword
        .string()
        .minOfSpecialCharacters(2)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
            'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters':
                  '{#label} should contain at least {#min} special character',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces',
            'password.onlyLatinCharacters': '{#label} should contain only latin characters',
        }),

    userPhone: joi.number().integer().min(1000000000).max(9999999999999)
.message('invalid mobile number').required(),
city: joi.string().required(),
state:joi.string().required()

}).unknown(true),
//User login validation
userLogin: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
}).unknown(true)
}
module.exports = schema
