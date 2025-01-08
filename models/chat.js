//using for creating basic schema 
let mongoose = require("mongoose");

const newUserSchema=new mongoose.Schema({
    from:{
        type:String,
        required:[true,"From Was Required"]
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50
    },
    created_at:{
        type:Date,
        required:[true,"Date Was Required"]
    }
});

const chat =  mongoose.model("chat",newUserSchema);

module.exports= chat;