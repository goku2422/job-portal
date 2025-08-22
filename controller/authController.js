import userModels from "../models/userModels.js";
import usermodles from "../models/userModels.js";

export const  registerController = async (req, res,next) => {
    try {
        const {name,email,password} = req.body
            //validation
        if(!name){
           next("name is required");

        }
        if(!email){
            return next("email is required");

        }
        if(!password){
            return next("password is required");
        }
        const existingUser = await userModels.findOne({email})
        if(existingUser){
            next("User already exists with this email");
        }
        const user = await userModels.create(req.body)

        //token
        const token = user.createJWT()
        res.status(201).send({
            success:true,
            message:'user created successfully',
            user,
            token,
        });

    } catch (error) {
         next(error);
    }

};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find user by email
  const user = await userModels.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Useraname or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Useraname or password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login SUccessfully",
    user,
    token,
  });
};
