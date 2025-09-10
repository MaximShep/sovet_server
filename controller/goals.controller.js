const db = require('../config.js'); // Подключение к базе данных

class GoalController {
  // Добавление цели
  async addGoal(req, res) {
    const { school_id, type, name, description, target_amount, current_amount, start_date, period } = req.body;

    if (!school_id || !type || !name || !target_amount || !period) {
      return res.status(400).json({ message: 'Поля school_id, type, name, target_amount и period обязательны' });
    }

    const query = `
    INSERT INTO goals (school_id, type, name, description, target_amount, current_amount, start_date, period)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
    db.run(
      query,
      [school_id, type, name, description || null, target_amount, current_amount || 0, start_date || null, period],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Ошибка при добавлении цели' });
        }
        return res.status(201).json({ id: this.lastID, message: 'Цель успешно добавлена' });
      }
    );
  };

  async getSchoolGeneralGoals(req, res) {
    const { school_id } = req.body;
    if (!school_id) {
      return res.status(400).json({ message: 'Поле school_id обязательно' });
    }

    const query = `
      SELECT * 
      FROM goals 
      WHERE school_id = ? AND type = 'general'
      ORDER BY start_date DESC
    `;
    db.all(query, [school_id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при получении общих целей школы' });
      }
      return res.status(200).json(rows);
    });
  };

  // Получение всех личных целей школы
  async getSchoolPersonalGoals(req, res) {
    const { school_id } = req.body;

    if (!school_id) {
      return res.status(400).json({ message: 'Поле school_id обязательно' });
    }

    const query = `
      SELECT * 
      FROM goals 
      WHERE school_id = ? AND type = 'personal'
      ORDER BY start_date DESC
    `;
    db.all(query, [school_id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при получении личных целей школы' });
      }
      return res.status(200).json(rows);
    });
  };

  // Получение всех системных целей (независимо от школы)
  async getSystemGoals(req, res) {
    const query = `
      SELECT * 
      FROM goals 
      WHERE type = 'system'
      ORDER BY start_date DESC
    `;
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при получении системных целей' });
      }
      return res.status(200).json(rows);
    });
  };

  // Обновление текущей суммы цели
  async updateCurrentAmount(req, res) {
    const { id } = req.body;
    const { current_amount } = req.body;

    if (!current_amount) {
      return res.status(400).json({ message: 'Поле current_amount обязательно' });
    }

    const query = `
    UPDATE goals 
    SET current_amount = ? 
    WHERE id = ?
  `;
    db.run(query, [current_amount, id], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при обновлении текущей суммы цели' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Цель с указанным id не найдена' });
      }
      return res.status(200).json({ message: 'Текущая сумма успешно обновлена' });
    });
  };

  // Удаление цели
  async deleteGoal(req, res) {
    const { id } = req.body;

    const query = `
    DELETE FROM goals 
    WHERE id = ?
  `;
    db.run(query, [id], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при удалении цели' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Цель с указанным id не найдена' });
      }
      return res.status(200).json({ message: 'Цель успешно удалена' });
    });
  };
}

module.exports = new GoalController();