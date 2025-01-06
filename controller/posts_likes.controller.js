const db = require('../config.js'); // Подключение к базе данных

class PostsLikesController {
// Добавить лайк к посту
    async addPostLike(req, res) {
  const { post_id, user_id } = req.body;

  if (!post_id || !user_id) {
    return res.status(400).json({ message: 'Поля post_id и user_id обязательны' });
  }

  const query = `INSERT INTO posts_likes (post_id, user_id) VALUES (?, ?)`;

  db.run(query, [post_id, user_id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка добавления лайка' });
    }
    return res.status(201).json({ id: this.lastID, message: 'Лайк добавлен' });
  });
};

// Удалить лайк
    async removePostLike(req, res) {
    const { post_id, user_id } = req.body;
  
    if (!post_id || !user_id) {
      return res.status(400).json({ message: 'Поля post_id и user_id обязательны' });
    }
  
    const query = `DELETE FROM posts_likes WHERE post_id = ? AND user_id = ?`;
  
    db.run(query, [post_id, user_id], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка удаления лайка' });
      }
  
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Лайк не найден' });
      }
  
      return res.status(200).json({ message: 'Лайк удалён' });
    });
  };

// Получить все лайки для поста
    async getPostLikes(req, res) {
  const { post_id } = req.body;

  const query = `SELECT * FROM posts_likes WHERE post_id = ?`;

  db.all(query, [post_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка получения лайков' });
    }
    return res.status(200).json(rows);
  });
};
}

module.exports = new PostsLikesController();