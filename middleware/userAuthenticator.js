const jwt = require('jsonwebtoken')


  const userAuthenticator = async(req,res,next)=>{
       
    let token = req.headers.authorization
    try {
        if(token){
            let decode =jwt.verify(token,'deepak');
            let userID  = decode.userID;
            req.body.userID = userID
            console.log(userID,'i am userAuthenticator');
            next();
        }else{
            res.send({'msg':'something wrong in userAuthenticator tokenheader'});
            console.log('something wrong in userAuthenticator tokenheader','plelase login first')
        }
    } catch (error) {
        req.send({msg:'something wrong in userAuthenticator tokenheader'});
        console.log('something wrong in userAuthenticator tokenheader','plelase login first')
    }
     
  }

module.exports  = {userAuthenticator}