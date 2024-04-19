const JWT =  require('jsonwebtoken');
const user = require('../models/userSchema')

const isUser = async (req, res, next)=>{
    if(req.body.userRole === "user"){
        next();
    }
    res.status(401).json({
        status:false,
        message:"You are not Authorized person"
    })
}

const isAdmin = async (req, res, next)=>{
    if(req.body.userRole === "admin"){
        next();
    }
    return res.status(401).json({
        status:false,
        message:"you are not Authorized person"
    })
}
module.exports = { isUser, isAdmin }