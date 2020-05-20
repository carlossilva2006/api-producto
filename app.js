const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//ahora invocamos controller aqui
const controlVerb = require('./Controller/verbs');

app.use(bodyParser.urlencoded({extended :false}))

app.use(bodyParser.json())

app.get('/api/product', controlVerb.getProducts);

// para acceder a un unico recurso
app.get('/api/product/:productId', controlVerb.getProduct);

// Parra crear nuevos registros
app.post('/api/product', controlVerb.postProduct);

app.put('/api/product/:productId', controlVerb.putProduct);

app.delete('/api/product/:productId', controlVerb.deleteProduct);

module.exports = app;