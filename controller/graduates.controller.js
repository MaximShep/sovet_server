const db = require('../config.js'); // Подключение к базе данных

class GraduateController {
// Добавление выпускника
    async addGraduate(req, res) {
  const { name, departament, avatar, story_image, story_text, years_active, school_id } = req.body;

  if (!name || !departament || !years_active || !school_id) {
    return res.status(400).json({ message: 'Поля name, departament, years_active и school_id обязательны' });
  }

  const query = `
    INSERT INTO graduates (name, departament, avatar, story_image, story_text, years_active, school_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [name, departament, avatar || null, story_image || null, story_text || null, years_active, school_id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при добавлении выпускника' });
      }
      return res.status(201).json({ id: this.lastID, message: 'Выпускник успешно добавлен' });
    }
  );
};

// Получение всех выпускников школы
    async getGraduatesBySchool(req, res) {
  const { school_id } = req.body;

  if (!school_id) {
    return res.status(400).json({ message: 'Поле school_id обязательно' });
  }

  const query = `
    SELECT * 
    FROM graduates 
    WHERE school_id = ?
    ORDER BY years_active DESC
  `;
  db.all(query, [school_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при получении выпускников' });
    }
    return res.status(200).json(rows);
  });
};

// Удаление выпускника
    async deleteGraduate(req, res) {
  const { id } = req.body;

  const query = `
    DELETE FROM graduates 
    WHERE id = ?
  `;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при удалении выпускника' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Выпускник с указанным id не найден' });
    }
    return res.status(200).json({ message: 'Выпускник успешно удалён' });
  });
};
}

module.exports = new GraduateController();