const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
chai.use(chaiAsPromised);

const { salesService } = require("../../../services/salesService");
const { salesController } = require("../../../controllers/salesController");

describe("SalesController", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("#addSale", () => {
    it("ao adicionar uma venda corretamente retorna o status 201 e um objeto json", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, "addSale").resolves({
        id: 1,
        itemsSold: [{}, {}],
      });

      await salesController.addSale(req, res);

      chai.expect(res.status.calledWith(201)).to.be.equal(true);
      chai
        .expect(
          res.json.calledWith({
            id: 1,
            itemsSold: [{}, {}],
          })
        )
        .to.be.equal(true);
    });
  });

  describe("#getAll", () => {
    it("ao adicionar uma venda corretamente retorna o status 201 e um objeto json", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, "getAll").resolves([{ saleId: 1 }, { saleId: 2 }]);

      await salesController.getAll(req, res);

      chai.expect(res.status.calledWith(200)).to.be.equal(true);
      chai
        .expect(res.json.calledWith([{ saleId: 1 }, { saleId: 2 }]))
        .to.be.equal(true);
    });
  });

  describe("#getById", () => {
    it("ao adicionar uma venda corretamente retorna o status 201 e um objeto json", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 };

      sinon
        .stub(salesService, "getById")
        .resolves([{ saleId: 1 }, { saleId: 1 }]);

      await salesController.getById(req, res);

      chai.expect(res.status.calledWith(200)).to.be.equal(true);
      chai
        .expect(res.json.calledWith([{ saleId: 1 }, { saleId: 1 }]))
        .to.be.equal(true);
    });
  });

  describe("#deleteById", () => {
    it("deve retornar um status 204 ao deletar uma venda pelo id com sucesso", async () => {
      const req = {};
      const res = {};

      res.sendStatus = sinon.stub();

      req.params = { id: 1 };

      sinon.stub(salesService, "deleteById").resolves();

      await salesController.deleteById(req, res);
      chai.expect(res.sendStatus.calledWith(204)).to.be.equal(true);
    });
  });
});
