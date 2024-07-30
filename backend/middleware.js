const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require('./config');


function authmiddleware(req,res,next){
    const authheader=req.headers.authorization;
    console.log("hi")
    if(!authheader ){
        return res.json({});
    }
   
    const token=authheader.split(' ')[1];
    console.log(token)
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        console.log(decoded)
        if(decoded.userid){
            console.log(decoded.userid)
            req.userid=decoded.userid;
        next(); 
        }
       
    }
    catch{
        return res.json({});
    }
}
module.exports={
    authmiddleware
}