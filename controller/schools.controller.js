const db = require('../config.js'); // Подключение к базе данных


class SchoolsController {
// Создать новую запись в таблице schools
    async createSchool(req, res){
    const {
        login,
        password,
        short_name,
        full_name,
        mission,
        value,
        area,
        city,
        links,
        cover,
        image,
        count_of_users,
        competition_start,
    } = req.body;

    const query = `
        INSERT INTO schools (
            login, password, short_name, full_name, mission, value,
            area, city, links, cover, image, count_of_users, competition_start
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [
            login,
            password,
            short_name,
            full_name,
            mission,
            value,
            area,
            city,
            JSON.stringify(links), // Сериализуем JSON
            cover,
            image,
            count_of_users || 0,
            competition_start,
        ],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Ошибка создания школы.');
            }
            res.status(201).send({ id: this.lastID });
        }
    );
};

// Получить список всех школ
    async getSchools(req, res){
    const query = `SELECT * FROM schools`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка получения списка школ.');
        }
        res.status(200).send(rows);
    });
};

// Получить школу по ID
    async getSchoolById(req, res){
    const { id } = req.body;

    const query = `SELECT * FROM schools WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка получения школы.');
        }
        if (!row) {
            return res.status(404).send('Школа не найдена.');
        }
        res.status(200).send(row);
    });
};

// Обновить данные школы
    async updateSchool(req, res){
    const { id } = req.body;
    const {
        login,
        password,
        short_name,
        full_name,
        mission,
        value,
        area,
        city,
        links,
        cover,
        image,
        count_of_users,
        competition_start,
    } = req.body;

    const query = `
        UPDATE schools SET
            login = ?, password = ?, short_name = ?, full_name = ?, mission = ?, value = ?,
            area = ?, city = ?, links = ?, cover = ?, image = ?, count_of_users = ?, competition_start = ?
        WHERE id = ?
    `;

    db.run(
        query,
        [
            login,
            password,
            short_name,
            full_name,
            mission,
            value,
            area,
            city,
            JSON.stringify(links), // Сериализуем JSON
            cover,
            image,
            count_of_users,
            competition_start,
            id,
        ],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Ошибка обновления школы.');
            }
            if (this.changes === 0) {
                return res.status(404).send('Школа не найдена.');
            }
            res.status(200).send('Школа успешно обновлена.');
        }
    );
};

// Удалить школу
async deleteSchool(req, res){
    const { id } = req.body;

    const query = `DELETE FROM schools WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка удаления школы.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Школа не найдена.');
        }
        res.status(200).send('Школа успешно удалена.');
    });
};
}

module.exports = new SchoolsController();