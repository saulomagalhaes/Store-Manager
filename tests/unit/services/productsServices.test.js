const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const { throwNotFoundError } = require("../../../errors/NotFoundError");
const { productsModel } = require("../../../models/productsModel");
const { productsService } = require("../../../services/productsService");

chai.use(chaiAsPromised);

describe("ProductsService", () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe("#getAll", () => {
    it("ao solicitar uma busca por todos os produtos retorna um array com vários objetos ", async () => {
      sinon.stub(productsModel, "getAll").resolves([
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
      const products = await productsService.getAll();
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

  describe("#gettById", () => {
    it("ao solicitar uma busca de produto por parametro retorna um objeto", async () => {
      sinon
        .stub(productsModel, "getById")
        .resolves({ id: 1, name: "Martelo de Thor" });

      const product = await productsService.getById(1);
      chai.expect(product).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
    });
    it("ao solicitar uma busca de um produto que não existe um erro é disparado", async () => {
      sinon.stub(productsModel, "getById").resolves(undefined);

      chai
        .expect(productsService.getById(99999999999999))
        .to.eventually.be.rejectedWith(throwNotFoundError);
    });
  });

  describe("#create", () => {
    it("deve retornar true se encontrar o item", async () => {
      sinon.stub(productsModel, "create").resolves(1);
      const result = await productsService.create("Oculos");
      chai.expect(result).to.be.deep.equal({ id: 1, name: "Oculos" });
    });
  });
});
