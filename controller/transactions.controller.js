const db = require('../config.js'); // Подключение к базе данных

class TransactionController {
  // Добавление транзакции
  async addTransaction(req, res) {
    const { user_id, type, amount, reason } = req.body;

    if (!user_id || !type || !amount || !reason) {
      return res.status(400).json({ message: 'Все поля (user_id, type, amount, reason) обязательны' });
    }

    const query = `
    INSERT INTO transactions (user_id, type, amount, reason)
    VALUES (?, ?, ?, ?)
  `;
    db.run(query, [user_id, type, amount, reason], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при добавлении транзакции' });
      }
      return res.status(201).json({ id: this.lastID, message: 'Транзакция успешно добавлена' });
    });
  };

  // Получение транзакций пользователя
  async getUserTransactions(req, res) {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: 'Поле user_id обязательно' });
    }

    const query = `
    SELECT * 
    FROM transactions 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `;
    db.all(query, [user_id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при получении транзакций' });
      }
      return res.status(200).json(rows);
    });
  };

  // Получение баланса пользователя
  async getUserBalance(req, res) {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'Поле user_id обязательно' });
    }

    const query = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
      (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
       SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
    FROM transactions
    WHERE user_id = ?
  `;
    db.get(query, [user_id], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при расчёте баланса' });
      }
      return res.status(200).json(row);
    });
  };
}

module.exports = new TransactionController();