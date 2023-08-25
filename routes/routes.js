const express = require("express");
const router = express.Router();
const { 
    get_all_user,
    get_user_by__id,
    Create_user,
    logInUser,
    UpdateUser,
    UserDelete
} = require("../controller/User_control");


const  {
    detailUser,
    detailUserId,
    RegisterUserDetail,
    UpdateUserDetail,
    deleteUserDetail
}  = require("../controller/User_Detail_Control")

// User Relate Routes
router.route("/userinfo").get(get_all_user);
router.route("/userinfo/:id").get(get_user_by__id);
router.route("/register").post(Create_user);
router.route("/login").post(logInUser);
router.route("/update/:id").put(UpdateUser);
router.route("/deleteUser/:id").delete(UserDelete);


//User details Related Routes
router.route("/userDetail").get(detailUser);
router.route("/userDetail/:id").get(detailUserId);
router.route("/fillUserDetail").post(RegisterUserDetail);
router.route("/updateUserDetail/:id").put(UpdateUserDetail);
router.route("/deleteUserDetail/:id").delete(deleteUserDetail);

module.exports = router;

