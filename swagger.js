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
    },
    resAddProducts: {
      id: 1,
      name: 'Martelo de Thor',
    },
    addSale: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
    resAddSale: {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    },
    Sales: [
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: '2022-07-05T01:13:40.000Z',
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: '2022-07-05T01:13:40.000Z',
      },
    ],
    SaleID: [
      {
        date: '2022-07-05T01:13:40.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2022-07-05T01:13:40.000Z',
        productId: 2,
        quantity: 10,
      },
    ],
    resUpdateSale: {
      saleId: '1',
      itemsUpdated: [
        {
          productId: 1,
          quantity: 20,
        },
        {
          productId: 2,
          quantity: 30,
        },
      ],
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
