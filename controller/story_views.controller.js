const db = require('../config.js'); // Подключение к базе данных

class StoryViewsController {
// Создание записи о просмотре истории
    async createStoryView(req, res) {
    const { story_id, user_id } = req.body;

    const query = `
        INSERT INTO story_views (story_id, user_id, viewed_pages, is_completed)
        VALUES (?, ?, '[]', 0)
    `;

    db.run(query, [story_id, user_id], function (err) {
        if (err) {
            console.error('Ошибка при создании записи о просмотре истории:', err.message);
            return res.status(500).send('Ошибка при создании записи.');
        }

        res.status(201).send({ id: this.lastID, message: 'Запись о просмотре создана.' });
    });
};

// Обновление прогресса просмотра
    async updateStoryProgress(req, res) {
    const { id } = req.body; // ID записи в story_views
    const { viewed_pages, is_completed } = req.body;

    const query = `
        UPDATE story_views
        SET viewed_pages = ?, is_completed = ?
        WHERE id = ?
    `;

    db.run(query, [JSON.stringify(viewed_pages), is_completed, id], function (err) {
        if (err) {
            console.error('Ошибка при обновлении прогресса просмотра:', err.message);
            return res.status(500).send('Ошибка при обновлении прогресса.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Запись о просмотре не найдена.');
        }

        res.status(200).send('Прогресс просмотра обновлён.');
    });
};

// Получение статуса просмотра для пользователя
    async getStoryViewByUser(req, res) {
    const { story_id, user_id } = req.body;

    const query = `
        SELECT * FROM story_views
        WHERE story_id = ? AND user_id = ?
    `;

    db.get(query, [story_id, user_id], (err, row) => {
        if (err) {
            console.error('Ошибка при получении статуса просмотра:', err.message);
            return res.status(500).send('Ошибка при получении статуса просмотра.');
        }

        if (!row) {
            return res.status(404).send('Запись о просмотре не найдена.');
        }

        res.status(200).send(row);
    });
};

// Удаление записи о просмотре
    async deleteStoryView(req, res) {
    const { id } = req.body;

    const query = `
        DELETE FROM story_views WHERE id = ?
    `;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при удалении записи о просмотре:', err.message);
            return res.status(500).send('Ошибка при удалении записи.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Запись о просмотре не найдена.');
        }

        res.status(200).send('Запись о просмотре удалена.');
    });
};
}

module.exports = new StoryViewsController();