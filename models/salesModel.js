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
  async getAll() {
    const query = `
    SELECT 
    sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, sal.date
    FROM 
    StoreManager.sales_products AS sp
    INNER JOIN 
    StoreManager.sales AS sal ON sal.id = sp.sale_id
    `;
    const [rows] = await connection.query(query);
    return rows;
  },
  async getById(id) {
    const query = `
    SELECT 
    sal.date, sp.product_id AS productId, sp.quantity
    FROM 
    StoreManager.sales_products AS sp
    INNER JOIN 
    StoreManager.sales AS sal ON sal.id = sp.sale_id
    WHERE
    sp.sale_id = ?
    `;

    const [rows] = await connection.query(query, [id]);
    return rows;
  },
  async deleteById(id) {
    const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
    const [{ affectedRows }] = await connection.query(query, [id]);
    return !!affectedRows;
  },
  async updateById(id, productId, quantity) {
    const query = ` 
      UPDATE StoreManager.sales_products 
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?`;
    const [{ affectedRows }] = await connection.query(query, [
      quantity,
      id,
      productId,
    ]);
    return !!affectedRows;
  },
};
module.exports = { salesModel };
