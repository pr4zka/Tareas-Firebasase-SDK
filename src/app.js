const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require('express-handlebars')

const app = express();

//Configuracion de handlebars
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
}).engine)
app.set('view engine', '.hbs')
//

app.use(morgan("dev"));

//Para recibir archivos json
app.use(express.json())

//hace que el req.body contenga la informacion almacenada
app.use(express.urlencoded({extended: false}))

app.use(require("./routes/index"));

app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
