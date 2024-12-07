const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const { generateTokenAndSetCookie } = require('../utils/generateToken ')


exports.register =async(req,res)=>{
    try {
        const {username,password,email,phoneno,gender}=req.body;
        
        const emailCheck = await User.findOne({email})

        if(emailCheck){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            phoneno,
            gender,
            profilePic: gender === 'male'? boyProfilePic : girlProfilePic
        })

        if(newUser){
            //genrate jesonwentoken 
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
        }else{
            return res.status(400).json({
                success: false,
                message: "Failed to register user"
            })
        }

    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}


exports.login =async(req,res)=>{
    try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
	}
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            path: "/",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
