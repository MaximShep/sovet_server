const db = require('../config.js'); // Подключение к базе данных

class StoriesController {
// Создание новой истории
    async createStory (req, res){
    const { title, content, expiration_date } = req.body;
    const query = `
        INSERT INTO stories (title, content, created_at, expiration_date)
        VALUES (?, ?, datetime('now'), ?)
    `;

    db.run(query, [title, JSON.stringify(content), expiration_date], function (err) {
        if (err) {
            console.error('Ошибка при создании истории:', err.message);
            return res.status(500).send('Ошибка при создании истории.');
        }

        res.status(201).send({ id: this.lastID, message: 'История создана.' });
    });
};

// Получение всех активных историй (не истёкших)
    async getActiveStories (req, res){
    const query = `
        SELECT * FROM stories WHERE expiration_date >= datetime('now') ORDER BY created_at DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении историй:', err.message);
            return res.status(500).send('Ошибка при получении историй.');
        }

        res.status(200).send(rows);
    });
};

// Получение истории по ID
    async getStoryById (req, res){
    const { id } = req.body;
    const query = `SELECT * FROM stories WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Ошибка при получении истории:', err.message);
            return res.status(500).send('Ошибка при получении истории.');
        }

        if (!row) {
            return res.status(404).send('История не найдена.');
        }

        res.status(200).send(row);
    });
};

// Удаление истории
    async deleteStory (req, res){
    const { id } = req.body;
    const query = `DELETE FROM stories WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при удалении истории:', err.message);
            return res.status(500).send('Ошибка при удалении истории.');
        }

        if (this.changes === 0) {
            return res.status(404).send('История не найдена.');
        }

        res.status(200).send('История удалена.');
    });
};
}

module.exports = new StoriesController();