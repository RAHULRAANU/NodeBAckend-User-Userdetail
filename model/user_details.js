const mongoose = require("mongoose");

const User_Detail_Schema = mongoose.Schema({

    User_id :
    {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },

    full_name :
    {
        type : String,
        require : [true, "Please add the Name of User.."]
    },

    email:
    {
        type : String,
        require : [true, "Please add the User Email.."]
    },

    phone:
    {
        type : Number,
        require : [true, 'Please add the Phone Of User..'  ],
        length : 10,
        match : [/^[6-9]\d{9}$/, 'Phone number should be Numeric']
    },

    gender :
    {
        type : String,
        require : true,
        length : 6
    },

    User_role:
    {
        type : String,
        require : true,
        length : 15
    },

    DOB : 
    {
        type : Date,
        require : true
    },

    address :
    {
        type : String,
        require : true
    },
    company:
    {
        type : String,
        require : true,
        default : "staff"
    }      
},
    {
        timestamp : true
    }

);


module.exports = mongoose.model("User_Details", User_Detail_Schema);




