
const mongoose = require('mongoose');
const Shema = mongoose.Schema;

// crear esquema 
const ProductShema = Shema ({
    name      : String,
    picture   : String,
    price     : {type :Number, default : 0},
    categoria : {
        type  : String,
        enum  : [ 'computers', 'phones', 'accesories' ]
    }, 
    descripcion : String
})

// para exportarlo


module.exports = mongoose.model('Producto', ProductShema)

