const mongoose = require("mongoose");
const UserDetail = require("../model/user_details");
const asyncHandler = require("express-async-handler");



//@desc Get User Detail
//@routes Get User/UserDetails/
//@access  private


const detailUser = asyncHandler(async (req, res) => {

    const useDet = await UserDetail.find(req.params);
    res.status(200).json(useDet);
})


//@desc Get User Details By ID
//@routes Get /UserDetails/id
//@access  private

const detailUserId = asyncHandler(async (req, res) =>{

                                                        // .populate("User_id", "password")
    const useDetId = await UserDetail.findById(req.params.id).populate("User_id");

    if(!useDetId){
        res.status(400).json({success: false, message :`No data for this ${req.params.id}`});
    }else{
        res.status(200).json({useDetId});
    }
});



//@desc Register The User details
//@routes POST /RegisterUserDetail/
//@access   public


const RegisterUserDetail = asyncHandler(async (req, res) => {

    console.log("The Create Body Of User Details is", req.body);
        
    const {User_id, full_name, email, phone, gender, User_role, DOB, address, company } = req.body;

    if(!User_id || !full_name || !email || !phone || !gender || !User_role || !DOB || !address || !company ){

        return res.status(400).json({ error: "All Fields Are Mandatory! " });

    } else {
         const fillUserDetail = await UserDetail.create({

            User_id ,
            full_name,
            email,
            phone,
            gender,
            User_role,
            DOB,
            address,
            company

         });
         return res.status(200).json(fillUserDetail);
    }
});



//@desc  Update the User details
//@routes PUT/updateUserDetail/
//@Access  Private


const UpdateUserDetail = asyncHandler(async (req, res) =>{

    const updUdtUser = await UserDetail.findById(req.params.id);

    if(!updUdtUser){
        return res.status(400).json("User not Found");
    }else{
    const updUserDetail = await UserDetail.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
    );

    return res.status(200).json(updUserDetail);
    }
});



//@desc Delete The User Details
//@route DELETE /deleteUserDetail
//@Access private

const deleteUserDetail = asyncHandler(async (req, res) => {

    const DeleteUserDetail = await UserDetail.findById(req.params.id);

    if(!DeleteUserDetail){

        return res.status(400).json("User Not Found");

    } else {

            await UserDetail.deleteOne({_id : req.params.id});
            return res.status(200).json(DeleteUserDetail)
    };

});



module.exports = {

    detailUser,
    detailUserId,
    RegisterUserDetail,
    UpdateUserDetail,
    deleteUserDetail
};



