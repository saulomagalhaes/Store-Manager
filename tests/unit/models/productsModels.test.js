const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const { connection } = require("../../../models/connection");
const { productsModel } = require("../../../models/productsModel");

chai.use(chaiAsPromised);

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
      chai.expect(products).to.be.deep.equal([
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

  describe('#gettById', () => {
    it("ao solicitar uma busca de produto por parametro retorna um objeto", async () => {
      sinon
        .stub(connection, "execute")
        .resolves([[{ id: 1, name: "Martelo de Thor" }]]);
      
      const product = await productsModel.getById(1);
      chai.expect(product).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  })

  describe("#create", () => {
    it("deve retornar true se encontrar o item", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
      const id = await productsModel.create("Oculos");
      chai.expect(id).to.be.equal(1);
    });
  })
});
