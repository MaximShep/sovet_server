const db = require('../config.js'); // Подключение к базе данных

class CommentController {
// Создать комментарий
    async createComment(req, res) {
  const { post_id, author_id, content, parent_id } = req.body;

  if (!post_id || !author_id || !content) {
    return res.status(400).json({ message: 'Поля post_id, author_id и content обязательны' });
  }

  const query = `
    INSERT INTO comments (post_id, author_id, content, parent_id) 
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [post_id, author_id, content, parent_id || null], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка создания комментария' });
    }
    return res.status(201).json({ id: this.lastID, message: 'Комментарий успешно создан' });
  });
};

// Получить комментарии для поста
    async getCommentsByPostId(req, res) {
  const { post_id } = req.body;

  const query = `
    SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC
  `;
  db.all(query, [post_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка получения комментариев' });
    }
    return res.status(200).json(rows);
  });
};

// Лайкнуть комментарий
    async likeComment(req, res) {
  const { id } = req.body;

  const query = `
    UPDATE comments SET likes = likes + 1 WHERE id = ?
  `;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при добавлении лайка' });
    }
    return res.status(200).json({ message: 'Лайк добавлен' });
  });
};

// Удалить комментарий
    async deleteComment(req, res) {
  const { id } = req.body;

  const query = `
    DELETE FROM comments WHERE id = ?
  `;
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при удалении комментария' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Комментарий не найден' });
    }

    return res.status(200).json({ message: 'Комментарий удалён' });
  });
};
}

module.exports = new CommentController();