const { connection } = require('./connection');

const productsModel = {
  async getAll() {
    const query = 'SELECT * FROM StoreManager.products';
    const [rows] = await connection.query(query);
    return rows;
  },
  async getById(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id=?';
    const [[row]] = await connection.query(query, [id]);
    return row;
  },
  async create(name) {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.query(query, [name]);
    return insertId;
  },
};

module.exports = { productsModel };