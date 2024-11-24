import jwt from 'jsonwebtoken';
export const verifyToken =  (req, res, next)=>{
    const token =  req.headers['authorization'];
  
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
      return res.json({message: "error"})
    }
  }
  
  export default verifyToken;