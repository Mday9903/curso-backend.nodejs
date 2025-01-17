//Traemos a express:
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

//Creamos una aplicación con el constructor de express:
const app = express();
//Asginamos el puerto en el que queremos que corra el servidor:
const port = 3000;

//Middleware
app.use(express.json());

// Servir archivos estáticos
app.use(express.static('public'));

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};

app.use(cors(options));

//Params
app.get('/', (req, res) => {
  res.json('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.json('Hola soy una nueva ruta');
});

routerApi(app);

//Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log('Mi port ' + port));
