const db = require('../config.js'); // Подключение к базе данных

class PollResponsesController {
// Создание записи о прохождении опроса
    async createPollResponse(req, res) {
    const { poll_id, user_id } = req.body;

    const query = `
        INSERT INTO poll_responses (poll_id, user_id)
        VALUES (?, ?)
    `;

    db.run(query, [poll_id, user_id], function (err) {
        if (err) {
            console.error('Ошибка при создании ответа на опрос:', err.message);
            return res.status(500).send('Ошибка при создании ответа на опрос.');
        }

        res.status(201).send({ id: this.lastID, message: 'Ответ на опрос зарегистрирован.' });
    });
};

// Проверка, проходил ли пользователь опрос
    async checkPollResponse(req, res) {
    const { poll_id, user_id } = req.body;

    const query = `
        SELECT * FROM poll_responses WHERE poll_id = ? AND user_id = ?
    `;

    db.get(query, [poll_id, user_id], (err, row) => {
        if (err) {
            console.error('Ошибка при проверке ответа на опрос:', err.message);
            return res.status(500).send('Ошибка при проверке ответа на опрос.');
        }

        if (!row) {
            return res.status(404).send('Ответ на опрос не найден.');
        }

        res.status(200).send(row);
    });
};

// Удаление ответа на опрос
    async deletePollResponse(req, res) {
    const { id } = req.body;

    const query = `
        DELETE FROM poll_responses WHERE id = ?
    `;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при удалении ответа на опрос:', err.message);
            return res.status(500).send('Ошибка при удалении ответа на опрос.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Ответ на опрос не найден.');
        }

        res.status(200).send('Ответ на опрос удалён.');
    });
};
}

module.exports = new PollResponsesController();