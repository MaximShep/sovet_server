const db = require('../config.js'); // Подключение к базе данных

class NotificationsController {

// Создание нового уведомления
    async createNotification (req, res){
    const { user_id, type, content } = req.body;
    const query = `
        INSERT INTO notifications (user_id, type, content, is_read, created_at)
        VALUES (?, ?, ?, 0, datetime('now'))
    `;

    db.run(query, [user_id, type, content], function (err) {
        if (err) {
            console.error('Ошибка при создании уведомления:', err.message);
            return res.status(500).send('Ошибка при создании уведомления.');
        }

        res.status(201).send({ id: this.lastID, message: 'Уведомление создано.' });
    });
};

// Получение всех уведомлений пользователя
async getUserNotifications (req, res){
    const { user_id } = req.body;

    const query = `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`;

    db.all(query, [user_id], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении уведомлений:', err.message);
            return res.status(500).send('Ошибка при получении уведомлений.');
        }

        res.status(200).send(rows);
    });
};

// Обновление статуса уведомления (прочитано/непрочитано)
async updateNotificationStatus (req, res){
    const { id } = req.body;
    const { is_read } = req.body;

    const query = `UPDATE notifications SET is_read = ? WHERE id = ?`;

    db.run(query, [is_read, id], function (err) {
        if (err) {
            console.error('Ошибка при обновлении статуса уведомления:', err.message);
            return res.status(500).send('Ошибка при обновлении статуса уведомления.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Уведомление не найдено.');
        }

        res.status(200).send('Статус уведомления обновлён.');
    });
};

// Удаление уведомления
async deleteNotification (req, res){
    const { id } = req.body;

    const query = `DELETE FROM notifications WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при удалении уведомления:', err.message);
            return res.status(500).send('Ошибка при удалении уведомления.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Уведомление не найдено.');
        }

        res.status(200).send('Уведомление удалено.');
    });
};
}

module.exports = new NotificationsController();