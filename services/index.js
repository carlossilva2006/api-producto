'use strict'

const jwt = require('jwt-simple'),
   moment = require('moment'),
   config = require('../config')

function createToken(user){
    const playload = { // son los datos que viajan
        sub: user._id,
        iat: moment().unix(),  //cuando fue creado el token, nos da el timepo en formato unix
        exp: moment().add(14,'days').unix(),  //cuando expire puede ser años, y seria year en comillas
    }          // en este caso queremos que caduque en 14 dias
    return jwt.encode(playload, config.SECRET_TOKEN ) // esto es para codificar el token
}

function decodeToken(token) 
{  
    const decode = new Promise((resolve, reject) =>{
        try{
          const payload = jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp <= moment().unix()){
                reject({
                    status:401,
                    message: 'El token ah expirado'
                })
            }
            
            resolve(payload.sub)

        }catch(error){
            reject({
                status:500,
                message: 'Invalid Token'
            })
        }
    })
    return decode
}

module.exports = {
    createToken,
    decodeToken
}