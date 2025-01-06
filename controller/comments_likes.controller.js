const db = require('../config.js'); // Подключение к базе данных

class CommentsLikesController {

// Добавление лайка
    async likeComment(req, res) {
  const { comment_id, user_id } = req.body;

  if (!comment_id || !user_id) {
    return res.status(400).json({ message: 'Поля comment_id и user_id обязательны' });
  }

  const query = `
    INSERT INTO comments_likes (comment_id, user_id) 
    VALUES (?, ?)
  `;
  db.run(query, [comment_id, user_id], function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(400).json({ message: 'Этот пользователь уже лайкнул комментарий' });
      }
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при добавлении лайка' });
    }
    return res.status(201).json({ id: this.lastID, message: 'Лайк успешно добавлен' });
  });
};

// Удаление лайка
    async unlikeComment(req, res) {
  const { comment_id, user_id } = req.body;

  if (!comment_id || !user_id) {
    return res.status(400).json({ message: 'Поля comment_id и user_id обязательны' });
  }

  const query = `
    DELETE FROM comments_likes 
    WHERE comment_id = ? AND user_id = ?
  `;
  db.run(query, [comment_id, user_id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при удалении лайка' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Лайк не найден' });
    }

    return res.status(200).json({ message: 'Лайк успешно удалён' });
  });
};

// Подсчёт лайков для комментария
    async getLikesCount(req, res) {
  const { comment_id } = req.body;

  const query = `
    SELECT COUNT(*) AS likes_count 
    FROM comments_likes 
    WHERE comment_id = ?
  `;
  db.get(query, [comment_id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка при получении количества лайков' });
    }
    return res.status(200).json(row);
  });
};
}

module.exports = new CommentsLikesController();