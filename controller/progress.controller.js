const db = require('../config.js'); // Подключение к базе данных

class ProgressController {
  // Добавление прогресса
  async addProgress(req, res) {
    const { goal_id, user_id, amount } = req.body;
    console.log(req.body)
    if (!goal_id || !user_id || !amount) {
      return res.status(400).json({ message: 'Поля goal_id, user_id и amount обязательны' });
    }

    const query = `
    INSERT INTO progress (goal_id, user_id, amount)
    VALUES (?, ?, ?)
  `;
    db.run(query, [goal_id, user_id, amount], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при добавлении прогресса' });
      }
      return res.status(201).json({ id: this.lastID, message: 'Прогресс успешно добавлен' });
    });
  };

  // Получение прогресса цели
  async getGoalProgress(req, res) {
    const { goal_id } = req.body;

    if (!goal_id) {
      return res.status(400).json({ message: 'Поле goal_id обязательно' });
    }

    const query = `
    SELECT * 
    FROM progress 
    WHERE goal_id = ?
  `;
    db.all(query, [goal_id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при получении прогресса' });
      }
      return res.status(200).json(rows);
    });
  };

  // Получение общего прогресса пользователя
  async getUserProgress(req, res) {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'Поле user_id обязательно' });
    }

    const query = `
    SELECT * 
    FROM progress 
    WHERE user_id = ?
  `;
    db.all(query, [user_id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при получении прогресса пользователя' });
      }
      return res.status(200).json(rows);
    });
  };
  async updateProgress(req, res) {
    const { goal_id, user_id, amount } = req.body;

    if (!goal_id || !user_id || !amount) {
      return res.status(400).json({ message: 'Поля goal_id, user_id и amount обязательны' });
    }

    const query = `
      UPDATE progress
      SET amount = amount + ?
      WHERE goal_id = ? AND user_id = ?
    `;

    db.run(query, [amount, goal_id, user_id], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при обновлении прогресса' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Прогресс для указанной цели не найден' });
      }
      return res.status(200).json({ message: 'Прогресс успешно обновлён' });
    });
  };
}

module.exports = new ProgressController();