const express = require('express'),
          app = express(),
   bodyParser = require('body-parser'),
//ahora invocamos controller aqui
  controlVerb = require('./Controller/verbs'),
        auth  = require('./middlewares/auth'),
     userCtrl = require('./controllers/users')

app.use(bodyParser.urlencoded({extended :false}))

app.use(bodyParser.json())

app.get('/api/product', controlVerb.getProducts)

// para acceder a un unico recurso
app.get('/api/product/:productId', controlVerb.getProduct)

// Parra crear nuevos registros
app.post('/api/product', auth, controlVerb.postProduct)

app.put('/api/product/:productId', auth, controlVerb.putProduct)

app.delete('/api/product/:productId', auth, controlVerb.deleteProduct)

app.get('/private', auth, (req, res) =>
{  
  res.status(200).send({message :'tienes acceso '})
})
app.post('/signup',userCtrl.signUp)
app.post('/signin',userCtrl.signIn)

module.exports = app