import bcryptjs from 'bcryptjs';
import { pool } from '../databases/poolDb';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const passwordHash = await bcryptjs.hash(password, 10);

    pool.getConnection((err, con) => {
      const sql = `INSERT INTO user (name, password_hash, email) VALUES (?, ?, ?)`;

      con.query(sql, [name, passwordHash, email], (error) => {
        const errorCode = error ? error.code : null;

        if (errorCode) {
          if (errorCode === 'ER_CHECK_CONSTRAINT_VIOLATED') {
            res.json('Email inválido !');
          }

          if (errorCode === 'ER_DUP_ENTRY') {
            res.json('Email já existe !');
          }
        }

        if (error) {
          return;
        }

        res.json('usuario inserido');
      });

      con.release();
    });
  }

  async index(req, res) {
    pool.getConnection((error, con) => {
      if (error) return;
      const sql = `SELECT * FROM user`;
      con.query(sql, (err, response) => {
        if (err) return;
        res.json(response);
      });
      con.release();
    });
  }

  async update(req, res) {
    const { name, email, password } = req.body;
    const { emailQuery } = req.query;
    const passwordHash = await bcryptjs.hash(password, 10);

    pool.getConnection((error, con) => {
      if (error) return;
      const sql = `
      UPDATE user 
      SET name = ?, email = ?, password_hash = ?
      WHERE email = ?
      `;
      const sqlSelect = `
      SELECT * FROM user
      WHERE email = ?
      `;
      con.query(sqlSelect, [emailQuery], (err, response) => {
        if (err) {
          console.error('Usuario não encontrado');
          con.release();
        }
        if (response.length === 0) {
          res.json('Usuário não existe');
          con.release();
        }
        if (response.length !== 0) {
          con.query(sql, [name, email, passwordHash, emailQuery], (e) => {
            con.release();
            if (e) return;
            res.json('Usuário alterado');
          });
        }
      });
    });
  }

  async delete(req, res) {
    const { emailQuery } = req.query;
    pool.getConnection((error, con) => {
      if (error) return;
      const sql = `
      DELETE FROM user
      WHERE email = ?
      `;
      const sqlSelect = `
      SELECT * FROM user
      WHERE email = ?
      `;
      con.query(sqlSelect, [emailQuery], (err, response) => {
        if (err) {
          console.error('Usuario não encontrado');
          con.release();
        }
        if (response.length === 0) {
          res.json('Usuário não existe');
          con.release();
        }
        if (response.length !== 0) {
          con.query(sql, [emailQuery], (e) => {
            con.release();
            if (e) return;
            res.json('Usuário deletado !');
          });
        }
      });
    });
  }
}

export default new UserController();
