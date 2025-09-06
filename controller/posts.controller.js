const db = require('../config.js'); // Подключение к базе данных

class PostController {
// Создание нового поста
    async createPost(req, res) {
    const { school_id, content, image, type } = req.body;

    const query = `
        INSERT INTO posts (school_id, content, image, type, created_at, likes, comments_count)
        VALUES (?, ?, ?, ?, datetime('now'), 0, 0)
    `;

    db.run(query, [school_id, content, image || null, type], function (err) {
        if (err) {
            console.error('Ошибка при создании поста:', err.message);
            return res.status(500).send('Ошибка при создании поста.');
        }

        res.status(201).send({ id: this.lastID, message: 'Пост создан.' });
    });
};

// Получение всех постов
    async getAllPosts(req, res) {
    const query = `
        SELECT * FROM posts ORDER BY created_at DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении постов:', err.message);
            return res.status(500).send('Ошибка при получении постов.');
        }

        res.status(200).send(rows);
    });
};

// Получение поста по ID
    async getPostById(req, res) {
    const { id } = req.body;

    const query = `
        SELECT * FROM posts WHERE id = ?
    `;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Ошибка при получении поста:', err.message);
            return res.status(500).send('Ошибка при получении поста.');
        }

        if (!row) {
            return res.status(404).send('Пост не найден.');
        }

        res.status(200).send(row);
    });
};

// Обновление количества лайков
    async updateLikes(req, res) {
    const { id, likes } = req.body;



    const query = `
        UPDATE posts SET likes = ? WHERE id = ?
    `;

    db.run(query, [likes, id], function (err) {
        if (err) {
            console.error('Ошибка при обновлении лайков:', err.message);
            return res.status(500).json({ error: 'Ошибка при обновлении лайков.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Пост не найден.' });
        }

        res.status(200).json({ message: 'Количество лайков обновлено.' });
    });
};

// Удаление поста
    async deletePost(req, res) {
    const { id } = req.body;

    const query = `
        DELETE FROM posts WHERE id = ?
    `;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при удалении поста:', err.message);
            return res.status(500).send('Ошибка при удалении поста.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Пост не найден.');
        }

        res.status(200).send('Пост удалён.');
    });
};
}

module.exports = new PostController();