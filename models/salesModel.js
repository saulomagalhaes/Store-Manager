const { connection } = require('./connection');

const salesModel = {
  async addSale() {
    const query = 'INSERT INTO StoreManager.sales(date) values(default)';
    const [{ insertId }] = await connection.query(query);
    return insertId;
  },
  async addSalesProducts(saleId, sales) {
    const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES ?`;
    const map = sales.map((sale) => [saleId, sale.productId, sale.quantity]);
    await connection.query(query, [map], true);
    return true;
  },
  async existsProduct(arrayOfProductIds) {
    const query = 'SELECT * FROM StoreManager.products WHERE id IN (?);';
    const [items] = await connection.query(query, [arrayOfProductIds]);
    return items;
  },
};
module.exports = { salesModel };
