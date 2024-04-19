const user =require('./userValidationSchema')

module.exports = {

    registerUserValidation : async (req, res , next)=>{
        const value = await user.registerUser.validate(req.body, {abortEarly : false})

        if(value.error){
            res.json({
                success : 0,
                message : value.error.details[0].message
            })
        }else{
            next()
        }

    },

userLoginValidation : async (req, res ,next)=>{
    const login = await user.userLogin.validate(req.body, {abortEarly : false})
    if(login.error){
        res.json({
            success : 0,
            message : value.error.details[0].message
        })
    }else{
        next()
    }
}
}