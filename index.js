'use strict'

const app = require('./app'),
 mongoose = require('mongoose'),
 config   = require('./config')


mongoose.connect(config.db, (error, resp) =>{
    if(error){
        return console.log('error a conectar a la base de datos :',`${error}`);
    }
    console.log('conexion a la base de datos establecida .........');

    app.listen(config.port, () => {
        console.log(`API REST corriendo en https://localhost:${config.port}`)
    })
})

