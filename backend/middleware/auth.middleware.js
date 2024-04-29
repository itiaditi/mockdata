const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(400).json({msg:"Unauthorized user, please login"})
    }
    jwt.verify(token,"masai",(err,decoded)=>{
        if(err){
            return res.status(401).json({msg:"Unauthorized"})
        }
        req.body.userId = decoded._id;
        console.log(req.body.userId)
        next();
    })
}

module.exports={
    auth
}