const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : true 
    },
    userPhone : {
        type : Number,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    password :{
        type : String,
        require :true
    },
    city : {
        type : String,
        require : true,
    },
    state :{
        type : String,
        require : true,
    },
     profilePic :{
         type : String,
        require : true

    },
    isActive :{
        type : Boolean,
        default : true
    },
    role :{
        type : String,
        default : "User"
    }
})
userSchema.set('timestamps',true)
module.exports = mongoose.model('user_detail',userSchema)
