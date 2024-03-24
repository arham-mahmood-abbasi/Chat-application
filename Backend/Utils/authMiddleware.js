const jwt = require("jsonwebtoken");
// Middle ware to validate user's token
async function validateToken(req,res,next){
    // this technique is used as bearer token
    var token = req.headers.authorization;//bearer:'token'
    if(!token){
        return res.status(401).json({message:'Access denied Please login to access the app.'})
    }
    token = token.split(' ')[1];
    const secretKey= process.env.SECRET_KEY;
    jwt.verify(token,secretKey,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:'Failed to authenticatie token'});
        }
        req.user=decoded;//by thid the things in the payload comes here.
        next();
    });
}
function requireRoles(roles){
    return(req,res,next)=>{
        const userRole = req.user.role
        if(roles.includes(userRole)){
            next();
        }
        else{
            res.status(403).json({message:'Permission Denied'})
        }
    }
}
module.exports={validateToken,requireRoles};