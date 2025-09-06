const db = require('../config.js'); // Подключение к базе данных

class FiltersController {
// Создание нового фильтра
    async createFilter (req, res){
    const { name } = req.body;
    const query = `
        INSERT INTO filters (name)
        VALUES (?)
    `;

    db.run(query, [name], function (err) {
        if (err) {
            console.error('Ошибка при создании фильтра:', err.message);
            return res.status(500).send('Ошибка при создании фильтра.');
        }

        res.status(201).send({ id: this.lastID, message: 'Фильтр создан.' });
    });
};

//получение всех фильтров
async getAllFilters (req, res){
    const query = `
        SELECT * FROM filters
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Ошибка при получении фильтров:', err.message);
            return res.status(500).send('Ошибка при получении фильтров.');
        }

        res.status(200).send(rows);
    });
};

// Удаление фильтра
async deleteFilter (req, res){
    const { id } = req.body;
    const query = `DELETE FROM filters WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error('Ошибка при удалении фильтра:', err.message);
            return res.status(500).send('Ошибка при удалении фильтра.');
        }

        if (this.changes === 0) {
            return res.status(404).send('Фильтр не найден.');
        }

        res.status(200).send('Фильтр удален.');
    });
};
}

module.exports = new FiltersController();