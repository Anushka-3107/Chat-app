const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    console.log("Signing token with secret:", process.env.JWT_SECRET); // Add this line
    return jwt.sign({id},process.env.JWT_SECRET,{
       expiresIn:"30d", 
    });
};

module.exports = generateToken;