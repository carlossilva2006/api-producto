require('./config/config');
const app = require('./app');
const mongoose = require('mongoose');

// importacion de models mongo para usarlo
// const Producto = require('./models/productos');
mongoose.connect('mongodb://localhost:27017/shop', (error, resp) =>{
    if(error){
        return console.log('error a conectar a la base de datos :',`${error}`);
    }
    console.log('conexion a la base de datos establecida');

    app.listen(process.env.PORT, () => {
        console.log('API REST corriendo en https://localhost:',process.env.PORT);
    })
})

