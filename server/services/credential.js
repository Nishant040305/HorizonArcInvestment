const jwtToken  = require('jsonwebtoken')

const getUser=(token)=>{
    if(!token) return null;
    try{
        return jwtToken.verify(token,process.env.jwt_secreat);

    }catch(err){
        return null;
    }
}

const createUser = (user)=>{

    return jwtToken.sign(user,process.env.jwt_secreat)

}

module.exports = {getUser,createUser};