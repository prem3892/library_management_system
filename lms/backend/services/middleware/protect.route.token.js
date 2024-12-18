import jwt from 'jsonwebtoken';



export const verifyToken =  (req, res, next)=>{
     const token = req.cookies.accessToken;

    if(token){
      jwt.verify(token, "secret", (err, decode)=>{
        if(err){
          return res.json({message: "invalid token or expired"})
        }
  
        req.userid =  decode.userid;
        next()
      })
    }else
    {
      return res.json({message: "cookie not found"})
    }
  }
  
  export default verifyToken;


