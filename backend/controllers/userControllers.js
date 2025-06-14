const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,img} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields")
    }

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //if the user does not exist, then create a new user 
    const user = await User.create({
        name,
        email,
        password,
        img,
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            img:user.img,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Failed to create new user')
    }
});

const authUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});
    console.log('user fetched: ', user);

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            email:user.email,
            img:user.img,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }


})

module.exports = {registerUser, authUser}