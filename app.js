const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(errorHandler);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
