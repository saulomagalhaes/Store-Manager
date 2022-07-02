const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

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
      ]);
      const products = await productsService.getAll();
      chai.expect(products).to.deep.equal([
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
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
      chai.expect(product).to.deep.equal({ id: 1, name: "Martelo de Thor" });
    });

    it("ao solicitar uma busca de um produto que não existe um erro é disparado", () => {
      sinon.stub(productsModel, "getById").resolves(undefined);
      return chai
        .expect(productsService.getById(99999999999999))
        .to.eventually.be.rejectedWith("Product not found");
    });
  });

  describe("#create", () => {
    it("deve retornar true se encontrar o item", async () => {
      sinon.stub(productsModel, "create").resolves(1);
      const result = await productsService.create("Oculos");
      chai.expect(result).to.deep.equal({ id: 1, name: "Oculos" });
    });
  });

  describe("#updateById", () => {
    it("deve disparar um erro caso o retorno do model seja falso", () => {
      sinon.stub(productsModel, "updateById").resolves(false);
      return chai
        .expect(productsService.updateById(100000, "Falso"))
        .to.eventually.be.rejectedWith("Product not found");
    });

    it("deve retornar um objeto caso dê tudo certo", async () => {
      sinon.stub(productsModel, "updateById").resolves(true);
      const result = await productsService.updateById(
        1,
        "Bandeira do Flamengo"
      );
      chai
        .expect(result)
        .to.deep.equal({ id: 1, name: "Bandeira do Flamengo" });
    });
  });
});
