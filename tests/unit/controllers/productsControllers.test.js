const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
chai.use(chaiAsPromised);

const {
  productsController,
} = require("../../../controllers/productsController");
const { productsService } = require("../../../services/productsService");

describe("ProductsController", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("#getAll", () => {
    it("ao solicitar uma busca por todos os produtos retorna um array com vários objetos ", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "getAll").resolves([
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
      ]);
      await productsController.getAll(req, res);
      chai.expect(res.status.calledWith(200)).to.be.equal(true);
      chai
        .expect(
          res.json.calledWith([
            {
              id: 1,
              name: "Martelo de Thor",
            },
            {
              id: 2,
              name: "Traje de encolhimento",
            },
          ])
        )
        .to.be.equal(true);
    });
  });

  describe("#gettById", () => {
    it("ao solicitar uma busca de produto por parametro retorna um objeto", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      req.params = { id: 1 };

      sinon
        .stub(productsService, "getById")
        .resolves({ id: 1, name: "Martelo de Thor" });

      await productsController.getById(req, res);
      chai.expect(res.status.calledWith(200)).to.be.equal(true);
      chai
        .expect(res.json.calledWith({ id: 1, name: "Martelo de Thor" }))
        .to.be.equal(true);
    });
  });

  describe("#create", () => {
    it("deve retornar o objeto criado em caso de sucesso", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      req.body = {
        name: "flamengo",
      };

      sinon.stub(productsService, "create").resolves({
        id: 1,
        name: "flamengo",
      });

      await productsController.create(req, res);
      chai.expect(res.status.calledWith(201)).to.be.equal(true);
      chai
        .expect(
          res.json.calledWith({
            id: 1,
            name: "flamengo",
          })
        )
        .to.be.equal(true);
    });
  });

  describe("#updateById", () => {
    it("ao solicitar uma busca de produto por parametro retorna um objeto", async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      req.params = { id: 1 };
      req.body = {
        name: "Bandeira do Flamengo",
      };

      sinon
        .stub(productsService, "updateById")
        .resolves({ id: 1, name: "Bandeira do Flamengo" });

      await productsController.updateById(req, res);
      chai.expect(res.status.calledWith(200)).to.be.equal(true);
      chai
        .expect(res.json.calledWith({ id: 1, name: "Bandeira do Flamengo" }))
        .to.be.equal(true);
    });
  });
});
