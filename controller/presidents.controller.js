const db = require('../config.js'); // Подключение к базе данных

class PresidentController {
// Добавление президента
    async addPresident(req, res) {
  const { is_current, name, description, start_date, end_date, link, image, school_id } = req.body;

  if (!name || !start_date || !school_id) {
    return res.status(400).json({ message: 'Поля name, start_date и school_id обязательны' });
  }

  const query = `
    INSERT INTO presidents (is_current, name, description, start_date, end_date, link, image, school_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [is_current, name, description || null, start_date, end_date || null, link || null, image || null, school_id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при добавлении президента' });
      }
      return res.status(201).json({ id: this.lastID, message: 'Президент успешно добавлен' });
    }
  );
};

// Получение всех президентов школы
    async getPresidentsBySchool(req, res) {
  const { school_id } = req.body;

  if (!school_id) {
    return res.status(400).json({ message: 'Поле school_id обязательно' });
  }

  const query = `
    SELECT * 
    FROM presidents 
    WHERE school_id = ?
    ORDER BY start_date DESC
  `;
  db.all(query, [school_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при получении президентов' });
    }
    return res.status(200).json(rows);
  });
};

// Обновление текущего президента
    async updateCurrentPresident(req, res) {
  const { id } = req.body;

  const query = `
    UPDATE presidents 
    SET is_current = 1 
    WHERE id = ?
  `;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при обновлении текущего президента' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Президент с указанным id не найден' });
    }

    // Сбрасываем статус is_current у остальных президентов школы
    const resetQuery = `
      UPDATE presidents 
      SET is_current = 0 
      WHERE id != ? AND school_id = (SELECT school_id FROM presidents WHERE id = ?)
    `;
    db.run(resetQuery, [id, id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при сбросе статуса других президентов' });
      }
      return res.status(200).json({ message: 'Текущий президент успешно обновлён' });
    });
  });
};

// Удаление президента
    async deletePresident(req, res) {
  const { id } = req.body;

  const query = `
    DELETE FROM presidents 
    WHERE id = ?
  `;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при удалении президента' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Президент с указанным id не найден' });
    }
    return res.status(200).json({ message: 'Президент успешно удалён' });
  });
};
}

module.exports = new PresidentController();