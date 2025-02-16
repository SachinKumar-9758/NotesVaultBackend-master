const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

module.exports.login=async (req,res) =>{
    // find user with given mail id
    let user = await User.findOne({email:req.body.email});
    // console.log('i am here')
    if(user)
    {
        const val=await bcrypt.compare(req.body.password,user.password)
        if(val)
        {
            authToken=jwt.sign(user.id,process.env.JWT_SECRET);
            return res.json({
                success: true,
                message: 'User successfully logged in',
                user: user,
                authToken: authToken 
            });
        }
        return res.json({success:false,message: 'enter correct password'});
    }
    return res.json({success:false ,message: 'User not found'});

}

module.exports.logout=(req,res) =>{
    return res.json({ success: true, message: 'Logout successful' });
}
module.exports.getProfile= async (req,res) =>{
    const user = await User.findOne({_id:req.id});
    if(user)
    {
        return res.json({success:true,user:user});
    }
    return res.json({success:false,message: 'User not found'});
}

module.exports.register= async  (req,res) =>{
    let user=await User.findOne({email:req.body.email});
    // console.log(user)
    if(user){
        return res.json({success:false,message:'user is already registered'});
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    User.create({name:req.body.name,password:hashedPassword,email:req.body.email})
    .then(data=>{
        authToken=jwt.sign(data._id.toString(),process.env.JWT_SECRET);
        
        return res.json({success:true,message:'user registration successful',user:data, authToken:authToken});
    })
    .catch(err =>{
        res.json({success:false,message:err.message});
    });
}