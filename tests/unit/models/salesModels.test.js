const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
chai.use(chaiAsPromised);

const { connection } = require("../../../models/connection");
const { salesModel } = require("../../../models/salesModel");

describe("SalesModel", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe.only("#existsProduct", () => {
    it("deve disparar um erro caso o db.query dispare um erro", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.existsProduct([1,2])).to.eventually.rejected;
    });

    it("deve retornar undefined caso o db.query retorne uma lista vazia", () => {
      sinon.stub(connection, "query").resolves([]);
      return chai.expect(salesModel.existsProduct([1, 2])).to.eventually.be
        .undefined;
    });

    it("deve retornar um array caso o db.query retorne vários items na lista", () => {
      sinon.stub(connection, "query").resolves([[{}, {}]]);
      return chai
        .expect(salesModel.existsProduct([1, 2]))
        .to.eventually.deep.equal([{}, {}]);
    });
  });

  // describe("#addSale", () => {
  //   it("ao solicitar uma busca de produto por parametro retorna um objeto", async () => {
  //     sinon
  //       .stub(connection, "query")
  //       .resolves([[{ id: 1, name: "Martelo de Thor" }]]);

  //     const product = await salesModel.getById(1);
  //     chai.expect(product).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
  //   });
  // });

  // describe("#addSalesProducts", () => {
  //   it("deve retornar true se encontrar o item", async () => {
  //     sinon.stub(connection, "query").resolves([{ insertId: 1 }]);
  //     const id = await salesModel.create("Oculos");
  //     chai.expect(id).to.be.equal(1);
  //   });
  // });
});