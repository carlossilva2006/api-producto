'use strict'

const Producto = require('../models/productos')

function getProducts (req, res) {
    Producto.find({}, (error, products) => {
        if(error) return res.status(500).send({message:`Error al realizar la peticion ${error}`})
        if(!products) return res.status(404).send({message: `No existen productos`})

      //si todo va bien se envia esto
        res.send(200, {products});

    })
}

function getProduct(req, res) {
    let productId = req.params.productId

    Producto.findById(productId, (error, product) => {
        if(error) 
        return res.status(500).send({message: `error al realizar la peticion: ${error}`})
        if(!product) 
        return res.status(404).send({message:`El producto no existe`})

        res.status(200).send({product : product})
    })
}

function postProduct (req, res) {
    console.log('post/api/product');
    console.log(req.body);
    //para almacenar un nuevo producto en la BD
    let product = new Producto();
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.categoria = req.body.categoria
    product.descripcion = req.body.descripcion

    product.save((error, productStored) => {
        if (error) res.status(500).send({message: 'error al salvar la base de datos'});
        
        res.status(200).send({product : productStored});
    })

}

function putProduct (req, res) {
    let productId = req.params.productId;
    let actualiza = req.body;

    Producto.findByIdAndUpdate(productId, actualiza, (error, productoActualizado) => {
        if(error) res.status(500).send({message:`Error al actualizar el producto: ${error}`});

        res.status(200).send({product : productoActualizado});
    })

}

function deleteProduct (req, res) {
    let productId =  req.params.productId;

    Producto.findById(productId, (error, product) => {
        if(error) res.status(500).send({message:`Error al borrar el producto: ${error}`});
    
        product.remove(error => {
            if(error) res.status(500).send({message:`Error al borrar el producto: ${error}`});
            res.status(200).send({message:`El producto a sido eliminado`})
        })
    })
    
}

module.exports = {
    getProduct,
    getProducts,
    postProduct,
    putProduct,
    deleteProduct
}