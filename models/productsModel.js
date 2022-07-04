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
  async updateById(id, name) {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    const [{ affectedRows }] = await connection.query(query, [name, id]);
    return !!affectedRows;
  },
  async deleteById(id) {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?';
    const [{ affectedRows }] = await connection.query(query, [id]);
    return !!affectedRows;
  },
  async searchByName(name) {
    const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const [rows] = await connection.query(query, [`%${name}%`]);
    return rows;
  },
};

module.exports = { productsModel };
