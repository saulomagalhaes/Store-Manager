const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

const { salesService } = require("../../../services/salesService");
const { salesModel } = require("../../../models/salesModel");

describe("SalesServices", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("#addSale", () => {
    it("deve disparar um erro caso o salesModel retorne um array vazio", () => {
      sinon.stub(salesModel, "existsProduct").resolves([]);
      return chai
        .expect(salesService.addSale([{}, {}]))
        .to.eventually.be.rejectedWith("Product not found");
    });

    it("deve disparar um erro caso o salesModel retorne um array com tamanho diferente", () => {
      sinon.stub(salesModel, "existsProduct").resolves([{}]);
      return chai
        .expect(salesService.addSale([{}, {}]))
        .to.eventually.be.rejectedWith("Product not found");
    });

    it("deve retornar um objeto caso esteja tudo ok", () => {
      sinon.stub(salesModel, "existsProduct").resolves([{}, {}]);
      sinon.stub(salesModel, "addSale").resolves(1);
      sinon.stub(salesModel, "addSalesProducts").resolves();
      return chai
        .expect(salesService.addSale([{}, {}]))
        .to.eventually.deep.equal({ id: 1, itemsSold: [{}, {}] });
    });
  });

  describe("#getAll", () => {
    it("deve retornar uma lista com todas as vendas", async () => {
      sinon.stub(salesModel, "getAll").resolves([{ saleId: 1 }, { saleId: 2 }]);
      chai
        .expect(await salesService.getAll())
        .to.deep.equal([{ saleId: 1 }, { saleId: 2 }]);
    });
  });

  describe("#getById", () => {
    it("deve disparar um erro se retornar uma lista vazia", () => {
      sinon.stub(salesModel, "getById").resolves([]);
      return chai
        .expect(salesService.getById(9999))
        .to.eventually.be.rejectedWith("Sale not found");
    });

    it("deve retornar uma lista de uma venda específica", async () => {
      sinon
        .stub(salesModel, "getById")
        .resolves([{ saleId: 1 }, { saleId: 1 }]);
      chai
        .expect(await salesService.getById(1))
        .to.deep.equal([{ saleId: 1 }, { saleId: 1 }]);
    });
  });

  describe("#deleteById", () => {
    it("deve disparar um erro caso o retorno do model seja falso", () => {
      sinon.stub(salesModel, "deleteById").resolves(false);
      return chai
        .expect(salesService.deleteById(100000))
        .to.eventually.be.rejectedWith("Sale not found");
    });

    it("deve retornar true caso dê tudo certo", async () => {
      sinon.stub(salesModel, "deleteById").resolves(true);
      const result = await salesService.deleteById(1);
      chai.expect(result).to.be.true;
    });
  });

  describe("#updateById", () => {
    it("deve disparar um erro caso o salesModel retorne um array vazio", () => {
      sinon.stub(salesModel, "existsProduct").resolves([]);
      return chai
        .expect(salesService.updateById(1, [{}, {}]))
        .to.eventually.be.rejectedWith("Product not found");
    });

    it("deve disparar um erro caso o salesModel retorne um array com tamanho diferente", () => {
      sinon.stub(salesModel, "existsProduct").resolves([true]);
      return chai
        .expect(salesService.updateById(1, [{}, {}]))
        .to.eventually.be.rejectedWith("Product not found");
    });

    it("deve disparar um erro caso retorne algum false do BD", async () => {
      sinon.stub(salesModel, "existsProduct").resolves([{}, {}]);
      sinon.stub(salesModel, "updateById").resolves(false);
      return chai
        .expect(salesService.updateById(1, [{}, {}]))
        .to.eventually.be.rejectedWith("Sale not found");
    });

    it("deve retornar um objeto caso esteja tudo ok", () => {
      sinon.stub(salesModel, "existsProduct").resolves([{}, {}]);
      sinon.stub(salesModel, "updateById").resolves([true, true]);
      return chai
        .expect(salesService.updateById(1, [{}, {}]))
        .to.eventually.deep.equal({ saleId: 1, itemsUpdated: [{}, {}] });
    });
  });
});
