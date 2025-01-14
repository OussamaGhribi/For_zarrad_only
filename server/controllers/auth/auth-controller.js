const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { message } = require("statuses");

//register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser)
        return res.json({
            success: false,
            message: "User Already exists with the same email! Please try again",
        });

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
        userName,
        email,
        password: hashPassword,
        });

        await newUser.save();
        res.status(200).json({
        success: true,
        message: "Registration successful",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
        success: false,
        message: "Some error occured",
        });
    }
};

// login
const login=async(req,res)=>{
    const {email, password } = req.body;
    try{
        const checkUser = await User.findOne({ email });
        if(!checkUser) return res.json({
            success:false,
            message:"user doesn't exists, please register first"
        })
        const checkPasswordMatch=await bycrypt.compare(password,checkUser.password);
        if (!checkPasswordMatch) return res.json({
            success: false,
            message: "incorrect password ! please try again"
        })
        const token=jwt.sign({
            id : checkUser._id,role:checkUser.role,email:checkUser.email
        },'client_secret_key',{expiresIn :'60m'})

        res.cookie('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:'logged in successfuly',
            user:{
                email:checkUser.email,
                role:checkUser.role,
                id:checkUser._id

            }

        })


    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message:"some error occured",
        });
    }
}

// logout

// auth middleware


module.exports = {registerUser,loginUser};