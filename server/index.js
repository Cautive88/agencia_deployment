//Importar Express
const express = require('express');
const path    = require('path');
const routes  = require('./routes');
const bodyParser = require('body-parser');
const configs = require('./config');
const db = require('./config/database')

require('dotenv').config({ path: 'variable.env '});


db.authenticate()
.then(() => console.log("OK"))
.catch(error => console.log(error));




//Configurar Express
const app = express();

//Habilitar pug
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//Cargar una carpeta estatica llamada public
app.use(express.static('public'));

//validar si estas en Dev o PRD

const config = configs[app.get('env')];

//creamos la variable para el sitio

app.locals.titulo = config.nombresitio;



//Muestra Año Actual
app.use((req,res,next) =>{
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
})


//ejecutamos bodyparser

app.use(bodyParser.urlencoded({extended: true}));

//cartar rutas
app.use('/', routes());


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host,()=> {
    console.log('servidor esta funcionando');
});