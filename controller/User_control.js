const asyncHandler = require("express-async-handler");
const User = require("../model/user_login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//@desc Get All User 
//@routes Get /user/
//@Access Private

const get_all_user = asyncHandler( async (req, res, next) =>{

    const userDetail = await User.find(req.params);

    res.status(200).json(userDetail);

});



//@desc Get  User Details By ID
//@routes Get /user/id
//@Access Private


const get_user_by__id = asyncHandler(async (req, res) =>{

    const userById = await User.findById(req.params.id).select("+password");
    
    if(!userById){
        res.status(400).json({success: false, message :`No data for this ${req.params.id}`});
    }
    
    res.status(200).json({userById});

});




//@desc Register the User  
//@routes POST/user/register
//@Access public

const Create_user = asyncHandler(async (req, res) => {

    console.log("The Create Body of User is .....", req.body);

    // Check All User Fields are Fill or not

    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json({ error: "All Fields Are Mandatory! " });
    };


    // Check User Available 

    const userAvailable =  await User.findOne({email});
    if(userAvailable){
        return res.status(400).json({ error: "User Already Registered ... " });
        
    };


    // Hash Password
    
    const HashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", HashedPassword);

    const create_user = await User.create({
        username,
        email,
        password : HashedPassword
    });

    console.log("User Created....", create_user);

    if(create_user){
        return res.status(201).json(
            {
                _ID : create_user.id,
                USERNAME : create_user.username,
                EMAIL : create_user.email,
                PASSWORD : create_user.password
             });
    } else {
        console.error("Error during user creation:", error);
        return res.status(400).json({ error: "User Data is Not valid"});
    };
    // return res.json({ message: "Register the user" });
});
  


//@desc  Login User
//@routes POST/user/Login
//@access public


const logInUser = asyncHandler(async (req, res) => {

    console.log("User Loin Details is ...", req.body)

    const email = req.body.email;
    const password = req.body.password;
 
    if(!email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory");
    }

    const userAvail = await User.findOne( { email} ).select("+password");

    // console.log("userAvail .... ", userAvail);

    // Compare PAssword with HashedPassword

    if(userAvail && ( await bcrypt.compare(password, userAvail.password))){

        const generateToken = jwt.sign({
            users : {
                _USERNAME : userAvail.username,
                _EMAIL : userAvail.email,
                _ID : userAvail.id
            },
        },

         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "15m"}

        );

        res.status(200).json({generateToken});

    } else 
    {
        res.status(400);
        throw new Error("Email or Password is not valid ........");
    }   

});



//@desc Login User Update
//@routes PUT /Login/User/Update
//@Access public



const UpdateUser = asyncHandler(async (req, res) =>{

    const UserUpd = await User.findById(req.params.id);

    if(!UserUpd){
        return res.status(400).json("User not Found");
    } else {               
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new : true },
                req.body.password = await bcrypt.hash(req.body.password, 10),                
            ) ;  
        return res.status(200).json(updateUser);
    }
});


//@desc Login User Delete
//@routes DELETE Login/User/delete
//@Access Private


const UserDelete = asyncHandler(async (req, res) => {

    const DeleteUser = await User.findById(req.params.id);
    
    if(!DeleteUser){
        res.status(400).json("User not Found");
    }else{
        await User.deleteOne({_id : req.params.id});
        return res.status(200).json(DeleteUser);
    }
});



module.exports = {  

    get_all_user,
    get_user_by__id,
    Create_user,
    logInUser,
    UpdateUser,
    UserDelete

};

