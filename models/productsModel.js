const { connection } = require('./connection');

const productsModel = {
  async getAll() {
    const query = 'SELECT * FROM StoreManager.products';
    const [rows] = await connection.execute(query);
    return rows;
  },
  async getById(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id=?';
    const [[row]] = await connection.execute(query, [id]);
    return row;
  },
  async create(name) {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(query, [name]);
    return insertId;
  },
};

module.exports = { productsModel };