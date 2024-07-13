import User from "../models/User.js";

const postSignup = async (req, res) => {
    const { fullName, email, password, dob } = req.body;
  
    const user = new User({
      fullName,
      email,
      password,
      dob: new Date(dob),
    });
  
    try {
      const savedUser = await user.save();
  
      res.json({
        success: true,
        message: "Signup successfully",
        data: savedUser,
      });
    } 
    catch (error) {
      res.json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }

  const postLogin = async(req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({
        email: email,
        password: password
    })

    if(user){
        res.json({
            success: true,
            message: "Login successfully",
            data: user
        })
    }
    else{
        res.json({
            success: false,
            message: "Invalid credentials",
            data: null
        })
    }
   

}

  export {postSignup, postLogin}