const db = require('../config.js');

class PostsLikesController {
  constructor() {
    // Привязываем контекст для методов
    this.changeLike = this.changeLike.bind(this);
    this.checkLike = this.checkLike.bind(this);
  }

  // Используем стрелочную функцию для сохранения контекста
  checkLike = async (post_id, user_id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM posts_likes WHERE post_id = ? AND user_id = ?`;
      db.get(query, [post_id, user_id], (err, row) => {
        if (err) reject(err);
        resolve(!!row);
      });
    });
  }

  // Универсальная функция для добавления/удаления лайка
  async changeLike(req, res) {
    const { post_id, user_id } = req.body;
  
    if (!post_id || !user_id) {
      return res.status(400).json({ message: 'Поля post_id и user_id обязательны' });
    }
  
    try {
      const isLiked = await this.checkLike(post_id, user_id); 
      if (isLiked) {
        // Удаление лайка
        db.run('DELETE FROM posts_likes WHERE post_id = ? AND user_id = ?', 
          [post_id, user_id], 
          function (err) {
            if (err) {
              console.error('Ошибка удаления:', err); // Лог ошибки
              return res.status(500).json({ message: 'Ошибка удаления' });
            }
            
            if (this.changes === 0) {
              return res.status(404).json({ message: 'Лайк не найден' });
            }
            
            res.status(200).json({ message: 'Лайк удалён' });
          }
        );
      } else {
        // Добавление лайка
        db.run('INSERT INTO posts_likes (post_id, user_id) VALUES (?, ?)',
          [post_id, user_id],
          function (err) {
            if (err) {
              console.error('Ошибка добавления:', err); // Лог ошибки
              return res.status(500).json({ message: 'Ошибка добавления' });
            }
            
            res.status(201).json({ id: this.lastID, message: 'Лайк добавлен' });
          }
        );
      }
    } catch (error) {
      console.error('Критическая ошибка:', error); // Лог критической ошибки
      res.status(500).json({ message: 'Ошибка при обработке лайка' });
    }
  }

  // Получить все лайки для поста (осталось без изменений)
  async getPostLikes(req, res) {
    const { post_id } = req.body;
    const query = `SELECT * FROM posts_likes WHERE post_id = ?`;
    
    db.all(query, [post_id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка получения лайков' });
      }
      res.status(200).json(rows);
    });
  }
}

module.exports = new PostsLikesController();


// const db = require('../config.js'); // Подключение к базе данных

// class PostsLikesController {
// // Добавить лайк к посту
//     async addPostLike(req, res) {
//   const { post_id, user_id } = req.body;

//   if (!post_id || !user_id) {
//     return res.status(400).json({ message: 'Поля post_id и user_id обязательны' });
//   }

//   const query = `INSERT INTO posts_likes (post_id, user_id) VALUES (?, ?)`;

//   db.run(query, [post_id, user_id], function (err) {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Ошибка добавления лайка' });
//     }
//     return res.status(201).json({ id: this.lastID, message: 'Лайк добавлен' });
//   });
// };

// // Удалить лайк
//     async removePostLike(req, res) {
//     const { post_id, user_id } = req.body;
  
//     if (!post_id || !user_id) {
//       return res.status(400).json({ message: 'Поля post_id и user_id обязательны' });
//     }
  
//     const query = `DELETE FROM posts_likes WHERE post_id = ? AND user_id = ?`;
  
//     db.run(query, [post_id, user_id], function (err) {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Ошибка удаления лайка' });
//       }
  
//       if (this.changes === 0) {
//         return res.status(404).json({ message: 'Лайк не найден' });
//       }
  
//       return res.status(200).json({ message: 'Лайк удалён' });
//     });
//   };

// // Получить все лайки для поста
//     async getPostLikes(req, res) {
//   const { post_id } = req.body;

//   const query = `SELECT * FROM posts_likes WHERE post_id = ?`;

//   db.all(query, [post_id], (err, rows) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Ошибка получения лайков' });
//     }
//     return res.status(200).json(rows);
//   });
// };
// }

// module.exports = new PostsLikesController();