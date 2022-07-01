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
    it("deve disparar um erro caso o salesModel dispare um erro", () => {
      sinon.stub(salesModel, "existsProduct").rejects();
      return chai.expect(salesService.addSale([{}, {}])).to.eventually.rejected;
    });

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
});
