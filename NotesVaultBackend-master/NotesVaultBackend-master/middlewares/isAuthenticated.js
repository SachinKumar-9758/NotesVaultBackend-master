const jwt = require('jsonwebtoken');
module.exports.isAuthenticated = async (req, res, next) => {
    const token = await req.cookies['auth-token'] || req.headers.token
    // console.log(req.headers)
    // console.log(token)
    if(!token)
    {
        return res.json({ status:false, message:'kindly login first'});
    }
    const data = jwt.decode(token,process.env.JWT_SECRET);
    // console.log(data);
    req.id=data;
    next();
};