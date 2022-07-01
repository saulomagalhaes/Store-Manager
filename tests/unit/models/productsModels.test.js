const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
chai.use(chaiAsPromised);

const { connection } = require("../../../models/connection");
const { productsModel } = require("../../../models/productsModel");


describe("ProductsModel", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("#getAll", () => {
    it("deve disparar um erro caso o db.query dispare um erro", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(productsModel.getAll()).to.eventually.rejected;
    });

    it("deve retornar undefined caso o db.query retorne uma lista vazia", () => {
      sinon.stub(connection, "query").resolves([]);
      return chai.expect(productsModel.getAll()).to.eventually.be.undefined;
    });

    it("deve retornar um array caso o db.query retorne vários items na lista", () => {
      sinon.stub(connection, "query").resolves([[{}, {}]]);
      return chai.expect(productsModel.getAll()).to.eventually.deep.equal([{}, {}]);
    });
  });

  describe("#gettById", () => {
    it("ao solicitar uma busca de produto por parametro retorna um objeto", async () => {
      sinon
        .stub(connection, "query")
        .resolves([[{ id: 1, name: "Martelo de Thor" }]]);

      const product = await productsModel.getById(1);
      chai.expect(product).to.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
  });

  describe("#create", () => {
    it("ao adicionar um item no db deve retornar um id", async () => {
      sinon.stub(connection, "query").resolves([{ insertId: 1 }]);
      const id = await productsModel.create("Oculos");
      chai.expect(id).to.be.equal(1);
    });
  });
});
