const mongoose = require('mongoose')
 const     Shema    = mongoose.Schema,
//para encriptar 
      bcrypt   = require('bcrypt-nodejs'), // libreria para encriptar contraseñas
      cryto    = require('crypto')

// para crear el esquema en la base de datos 
const UserShema = new Shema({
    email       : { type : String, unique:true, lowercase:true }, 
    displayName : String,
    avatar      : String,
    password    : { type : String, select : false },
    signupDate  : {type : Date, default : Date.now() }, // nos dara la fecha en la que haga su usuario
    lastLogin   : Date 
})

// creamos una función en mongo antes que se ejecute para que este la encripte
// le decimos antes que se save en post ejecute la sgte instruccion
UserShema.pre('save', (next) => {   

    let user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error);

        bcrypt.hash(user.password, salt, null, (error, hash) => {
            if(error) return next(error);

            user.password = hash;
            next()
        })
    })
})

UserShema.methods.gravatar = function () {

    if(!this.email) return 'https://gravatar.com/avatar/?s=2005d=retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=2005=retro`;
}

module.exports = mongoose.model('User',UserShema);