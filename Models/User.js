const db = require('../Config/Dbnode'); // Assuming this is your database configuration file

class UserModel {
  static getUser() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM words', [], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  static addNewUser(kana, meaning_summary, short_meaning_summary) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO words (kana, meaning_summary, short_meaning_summary) VALUES (?, ?, ?)';
      db.query(query, [kana, meaning_summary, short_meaning_summary], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows > 0);
      });
    });
  }

  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM words WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows > 0);
      });
    });
  }

  static editUser(id, kana, meaning_summary, short_meaning_summary) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE words SET kana = ?, meaning_summary = ?, short_meaning_summary = ? WHERE id = ?';
      db.query(query, [kana, meaning_summary, short_meaning_summary, id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.affectedRows > 0);
      });
    });
  }

  static async insertWords(words) {
    const sql = 'INSERT INTO words (kana, meaning_summary, short_meaning_summary) VALUES ?';
    const values = words.map(word => [word.Kana, word.MeaningSummary, word.ShortMeaningSummary]);

    return new Promise((resolve, reject) => {
      db.query(sql, [values], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
  
  static async searchWords(term, page, mode) {
    const offset = page * 10; // Assuming each page contains 10 results
    const searchQuery = `
      SELECT * FROM words
      WHERE kana LIKE ? OR meaning_summary LIKE ? OR short_meaning_summary LIKE ?
      LIMIT 10 OFFSET ?`;
    const countQuery = `
      SELECT COUNT(*) AS total FROM words
      WHERE kana LIKE ? OR meaning_summary LIKE ? OR short_meaning_summary LIKE ?`;
    const values = [`%${term}%`, `%${term}%`, `%${term}%`];

    try {
      const [searchResults, countResults] = await Promise.all([
        new Promise((resolve, reject) => {
          db.query(searchQuery, [...values, offset], (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results);
          });
        }),
        new Promise((resolve, reject) => {
          db.query(countQuery, values, (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results[0].total);
          });
        })
      ]);

      return {
        Items: searchResults,
        TotalResults: countResults,
        TotalPages: Math.ceil(countResults / 10)
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
