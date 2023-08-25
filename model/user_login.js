const mongoose = require("mongoose");
const validation = require("validator");
const validate = require("mongoose-validate");

const User_schema = mongoose.Schema({

    username :
    {
        type : String,
        require : [true, "please add the Username "],
        trim : true,
        lowercase : true ,
        minlength : 3
    },

    email : 
    {
        type : String,
        require : [true, "Please add the user Email ..."],
        unique : [true, "Email is Already Used..."],
        // match : [],
        lowercase : true,
        validate(value){
        if(!validation.isEmail(value)){
            throw new Error("Email is Invalid....")
        }
        }
    },

    password :
    {
        type : String,  
        require : [true, " Please Add The Password...."],
        message: 'Password should contain alpha-numeric characters only',
        minlength : 8,
        select : false
 
    },

    // tokens : [{
    //     token : {
    //         type : String,
    //         require :true
    //     }
    // }]

},

{
    timestamps : true
}
);


module.exports = mongoose.model("User", User_schema);


