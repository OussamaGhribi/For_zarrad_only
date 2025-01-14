const express = require("express");
const {
  registerUser,
  loginUser,
  authMiddleware,
  logoutUser
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/check-auth", authMiddleware , (req,res)=>{});



module.exports = router;
