const express = require('express'),
          app = express(),
   bodyParser = require('body-parser'),
//ahora invocamos controller aqui
  controlVerb = require('./Controller/verbs'),
        auth  = require('./middlewares/auth'),
     userCtrl = require('./controllers/users'),
          hbs = require('express-handlebars')

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());
app.engine('.hbs',hbs({   //configuración de plantilla
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('views engine', '.hbs')
app.get('/login',(req, res) => {
  res.render('login')
})

app.get('/app/product', controlVerb.getProducts);
// para acceder a un unico recurso
app.get('/app/product/:productId', controlVerb.getProduct);
// Parra crear nuevos registros
app.post('/app/product', auth, controlVerb.postProduct);
app.put('/app/product/:productId', auth, controlVerb.putProduct);
app.delete('/app/product/:productId', auth, controlVerb.deleteProduct);
app.get('/private', auth, (req, res) =>
{  
  res.status(200).send({message :'tienes acceso '});
})
app.post('/signup',userCtrl.signUp);
app.post('/signin',userCtrl.signIn);

module.exports = app