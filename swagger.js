const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'Store Manager',
    description: 'API para gerenciamento de produtos e vendas',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Products',
      description: 'Endpoints',
    },
    {
      name: 'Sales',
      description: 'Endpoints',
    },
  ],
  definitions: {
    Products: [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
    ],
    Product: {
      id: 1,
      name: 'Martelo de Thor',
    },
    AddProducts: {
      $name: 'Martelo de Thor',
      $age: 29,
      about: '',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
