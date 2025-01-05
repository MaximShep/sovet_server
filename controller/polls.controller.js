const db = require('../config.js'); // Подключение к базе данных

class PollsController {
// Создание нового опроса
    async createPoll(req, res) {
    const { author_id, description, reward, criteria, link, expiration_date } = req.body;

    const query = `
        INSERT INTO polls (author_id, description, reward, criteria, link, count_of_compliting, created_at, expiration_date)
        VALUES (?, ?, ?, ?, ?, 0, datetime('now'), ?)
    `;

    db.run(
        query,
        [author_id, description, reward, JSON.stringify(criteria), link, expiration_date],
        function (err) {
            if (err) {
                console.error('Ошибка при создании опроса:', err.message);
                return res.status(500).send('Ошибка при создании опроса.');
            }

            res.status(201).send({ id: this.lastID, message: 'Опрос создан.' });
        }
    );
};

// Получение всех активных опросов
    async getActivePolls(req, res) {
    const query = `
        SELECT * FROM polls WHERE expiration_date >= datetime('now') ORDER BY created_at DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении опросов:', err.message);
            return res.status(500).send('Ошибка при получении опросов.');
        }

        res.status(200).send(rows);
    });
};

// Получение опроса по ID
    async getPollById(req, res) {
    const { id } = req.body;

    const query = `
        SELECT * FROM polls WHERE id = ?
    `;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Ошибка при получении опроса:', err.message);
            return res.status(500).send('Ошибка при получении опроса.');
        }

        if (!row) {
            return res.status(404).send('Опрос не найден.');
        }

        res.status(200).send(row);
    });
};

// Обновление количества прохождений опроса
    async incrementPollCount(req, res) {
    const { id } = req.body;

    const query = `
        UPDATE polls SET count_of_compliting = count_of_compliting + 1 WHERE id = ?
    `;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при обновлении счётчика опроса:', err.message);
            return res.status(500).send('Ошибка при обновлении счётчика.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Опрос не найден.');
        }

        res.status(200).send('Счётчик опроса обновлён.');
    });
};

// Удаление опроса
    async deletePoll(req, res) {
    const { id } = req.body;

    const query = `
        DELETE FROM polls WHERE id = ?
    `;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при удалении опроса:', err.message);
            return res.status(500).send('Ошибка при удалении опроса.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Опрос не найден.');
        }

        res.status(200).send('Опрос удалён.');
    });
};
}

module.exports = new PollsController();