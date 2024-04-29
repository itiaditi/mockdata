

const access=(...roles)=>{
    const userRoles = [...roles];
    console.log(userRoles)
    return ((req,res,next)=>{
        console.log(req.role);
        try{
            const user = req.user.role;
            if(userRoles.includes(user)){
                console.log(req.user.role)
                next();
            }
        }catch(err){
            res.status(404).json({err});
        }
    })
}

module.exports={
    access
}
