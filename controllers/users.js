//token
'use strict'

const mongoose = require('mongoose'),
      User     = require('../models/user'),
      service  = require('../services')

// Parte de registro, cuando se registre un usuario
function signUp(req, res) 
{  
    const user = new User({
        email : req.body.email,
        displayName : req.body.displayName
    })

    user.save((error) => {
        if(error) res.status(500).send({message:`Error al crear el usuario : ${error}`})
        return res.status(200).send({token : service.createToken(user) })
    })
}

//buscar en la BD los usuarios que tengan el email que pasemos por la peticion, 
//si existe daremos acceso creando un token que viajara en la cabecera y luego la app cliente hara la logica
function signIn(req, res) 
{  
   User.find({ email:req.body.email}, (error, user) => {
       if(error) return res.status(500).send({message : error})
       if(!user) return res.status(404).send({message :'No existe el usuario'})

       req.user = user
       res.status(200).send({message:'Te has logueado correctamente', toke: service.createToken(user)})
   })
}

module.exports = {
    signUp,
    signIn
}