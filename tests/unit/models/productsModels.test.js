const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../../models/connection");
const { productsModel } = require("../../../models/productsModel");

describe("ProductsModel", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("#getAll", () => {
    it("ao solicitar uma busca por todos os produtos no banco de dados retorna um array de objetos", async () => {
      sinon.stub(connection, "execute").resolves([
        [
          {
            id: 1,
            name: "Martelo de Thor",
          },
          {
            id: 2,
            name: "Traje de encolhimento",
          },
          {
            id: 3,
            name: "Escudo do Capitão América",
          },
        ],
      ]);
      const products = await productsModel.getAll();
      expect(products).to.be.deep.equal([
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ]);
    });
  });

  describe('#gettById', async () => {
    it("ao solicitar uma busca de produto por parametro retorna um objeto", async () => {
      sinon
        .stub(connection, "execute")
        .resolves([[{ id: 1, name: "Martelo de Thor" }]]);
      
      const product = await productsModel.getById(1);
      expect(product).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  })
});
