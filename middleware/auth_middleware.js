
const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")

const checkUserAuth = async (req, res , next)=>{
    let token;
    const {authorization } = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try{
            //Get token form header
            token = authorization.split(" ")[1]            
            const {userID} = jwt.verify(token, process.env.JWT_SECRET_KEY)
            //Get User from token 
            req.user = await User.findById(userID).select('-password')
            next();
        }catch(error){
            console.log(error)
            res.status(401).send({status: "false", message: "Unauthorize User"})
        }
    }else{
        res.status(401).send({"message": "Unauthorized User no"})
    }
}
module.exports = checkUserAuth
