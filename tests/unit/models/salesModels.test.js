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

  describe("#existsProduct", () => {
    it("deve disparar um erro caso o db.query dispare um erro", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.existsProduct([1, 2])).to.eventually
        .rejected;
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

  describe("#addSale", () => {
    it("deve disparar um erro caso o db.query dispare um erro", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.addSale()).to.eventually.rejected;
    });

    it("ao adicionar um item no db deve retornar um id", async () => {
      sinon.stub(connection, "query").resolves([{ insertId: 1 }]);

      const id = await salesModel.addSale();
      chai.expect(id).to.be.equal(1);
    });
  });

  describe("#addSalesProducts", () => {
    it("deve disparar um erro caso o db.query dispare um erro", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.addSalesProducts(1, [{}])).to.eventually
        .rejected;
    });

    it("deve retornar true se encontrar o item", async () => {
      sinon.stub(connection, "query").resolves([{ insertId: 1 }]);
      chai.expect(await salesModel.addSalesProducts(1, [{}])).to.be.equal(true);
    });
  });

  describe("#getAll", () => {
    it("deve disparar um erro caso o db.query dispare um erro", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.getAll()).to.eventually.rejected;
    });

    it("deve retornar uma lista com todas as vendas", async () => {
      sinon.stub(connection, "query").resolves([[{ saleId: 1 }, { saleId: 2 }]]);
      chai
        .expect(await salesModel.getAll())
        .to.deep.equal([{ saleId: 1 }, { saleId: 2 }]);
    });
  });

  describe("#getById", () => {
    it("deve disparar um erro caso o db.query dispare um erro", () => {
      sinon.stub(connection, "query").rejects();
      return chai.expect(salesModel.getById(1)).to.eventually.rejected;
    });

    it("deve retornar uma lista com todas as vendas", async () => {
      sinon.stub(connection, "query").resolves([[{}, {}]]);
      chai.expect(await salesModel.getById(1)).to.deep.equal([{}, {}]);
    });
  });
});
