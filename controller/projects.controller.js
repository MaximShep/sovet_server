const db = require('../config.js'); // Подключение к базе данных

class ProjectController {
// Добавление проекта
    async addProject(req, res) {
  const {
    school_id, name, short_description, logo, status, level, is_author, 
    author_name, author_link, count_users, images, start_date, end_date, 
    tizer, problem, users_description, concept, other, links, files
  } = req.body;

  if (!school_id || !name || !status || !level || !start_date) {
    return res.status(400).json({ message: 'Обязательные поля: school_id, name, status, level, start_date' });
  }

  const query = `
    INSERT INTO projects (
      school_id, name, short_description, logo, status, level, is_author, 
      author_name, author_link, count_users, images, start_date, end_date, 
      tizer, problem, users_description, concept, other, links, files
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [
      school_id, name, short_description || null, logo || null, status, level, 
      is_author, author_name || null, author_link || null, count_users || 0, 
      images || null, start_date, end_date || null, tizer || null, problem || null, 
      users_description || null, concept || null, other || null, links || null, files || null
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при добавлении проекта' });
      }
      return res.status(201).json({ id: this.lastID, message: 'Проект успешно добавлен' });
    }
  );
};


// Получение проектов школы, где автор указан
    async getProjectsBySchoolWithAuthor(req, res) {
  const { school_id } = req.body;

  if (!school_id) {
    return res.status(400).json({ message: 'Поле school_id обязательно' });
  }

  const query = `
    SELECT * 
    FROM projects 
    WHERE school_id = ? AND is_author = 1
    ORDER BY start_date DESC
  `;
  db.all(query, [school_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при получении проектов с автором' });
    }
    return res.status(200).json(rows);
  });
};

// Получение проектов школы, где автор не указан
    async getProjectsBySchoolWithoutAuthor (req, res){
  const { school_id } = req.body;

  if (!school_id) {
    return res.status(400).json({ message: 'Поле school_id обязательно' });
  }

  const query = `
    SELECT * 
    FROM projects 
    WHERE school_id = ? AND is_author = 0
    ORDER BY start_date DESC
  `;
  db.all(query, [school_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при получении проектов без автора' });
    }
    return res.status(200).json(rows);
  });
};

// Обновление проекта
    async updateProject(req, res) {
    const { id } = req.body;
    const {
      name,
      short_description,
      logo,
      status,
      level,
      is_author,
      author_name,
      author_link,
      count_users,
      images,
      start_date,
      end_date,
      tizer,
      problem,
      users_description,
      concept,
      other,
      links,
      files,
    } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: 'Поле id обязательно' });
    }
  
    const query = `
      UPDATE projects 
      SET 
        name = COALESCE(?, name),
        short_description = COALESCE(?, short_description),
        logo = COALESCE(?, logo),
        status = COALESCE(?, status),
        level = COALESCE(?, level),
        is_author = COALESCE(?, is_author),
        author_name = COALESCE(?, author_name),
        author_link = COALESCE(?, author_link),
        count_users = COALESCE(?, count_users),
        images = COALESCE(?, images),
        start_date = COALESCE(?, start_date),
        end_date = COALESCE(?, end_date),
        tizer = COALESCE(?, tizer),
        problem = COALESCE(?, problem),
        users_description = COALESCE(?, users_description),
        concept = COALESCE(?, concept),
        other = COALESCE(?, other),
        links = COALESCE(?, links),
        files = COALESCE(?, files)
      WHERE id = ?
    `;
  
    db.run(
      query,
      [
        name,
        short_description,
        logo,
        status,
        level,
        is_author,
        author_name,
        author_link,
        count_users,
        images,
        start_date,
        end_date,
        tizer,
        problem,
        users_description,
        concept,
        other,
        links,
        files,
        id,
      ],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Ошибка при обновлении проекта' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ message: 'Проект с указанным id не найден' });
        }
        return res.status(200).json({ message: 'Проект успешно обновлён' });
      }
    );
  };

// Удаление проекта
    async deleteProject(req, res) {
  const { id } = req.body;

  const query = `
    DELETE FROM projects 
    WHERE id = ?
  `;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при удалении проекта' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Проект с указанным id не найден' });
    }
    return res.status(200).json({ message: 'Проект успешно удалён' });
  });
};
}
module.exports = new ProjectController();