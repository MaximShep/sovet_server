const db = require('../config.js'); // Подключение к базе данных

class UserController {
    // Создание пользователя
    async createUser(req, res) {
        const {
            login, password, name, surname, grade, letter, image, level, coins, points, type_of_user, area,
            notifications_enabled, event_notifications, personal_notifications, game_notifications,
            created_at, last_login, is_verified, school_id
        } = req.body;
        console.log(req.body)
        console.log('Creating user with data:', {
            login, name, surname, grade, letter, type_of_user, area
        });

        const checkUserSql = "SELECT * FROM users WHERE login = ?";

        db.get(checkUserSql, [login], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Проверяем, существует ли пользователь с таким логином
            if (row) {
                console.warn('User with this login already exists:', login);
                return res.status(400).json({ error: 'User with this login already exists' });
            }

            // Создание пользователя
            const insertUserSql = `
                INSERT INTO users (
                    login, password, name, surname, grade, letter, image, level, coins, points, type_of_user, area,
                    notifications_enabled, event_notifications, personal_notifications, game_notifications,
                    created_at, last_login, is_verified, school_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(insertUserSql, [
                login, password, name, surname, grade, letter, image, level, coins, points, type_of_user, area,
                notifications_enabled, event_notifications, personal_notifications, game_notifications,
                created_at || new Date().toISOString(), last_login || null, is_verified || 0, school_id
            ], function (err) {
                if (err) {
                    console.error('Failed to create user:', err);
                    return res.status(500).json({ error: 'Failed to create user' });
                } else {
                    console.log('User created successfully:', this.lastID);
                    return res.status(201).json({ id: this.lastID, login, name, surname });
                }
            });
        });
    }

    // Получение пользователя по ID
    async getUser(req, res) {
        const { id } = req.body;

        const sql = "SELECT * FROM users WHERE id = ?";

        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (!row) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.json(row);
        });
    }

    // Обновление данных пользователя
    async updateUser(req, res) {
        const { id } = req.body;
        const {
            name, surname, grade, letter, image, level, coins, points, type_of_user, area,
            notifications_enabled, event_notifications, personal_notifications, game_notifications,
            last_login, is_verified, school_id
        } = req.body;

        const updateUserSql = `
            UPDATE users 
            SET 
                name = ?, surname = ?, grade = ?, letter = ?, image = ?, level = ?, coins = ?, points = ?, 
                type_of_user = ?, area = ?, notifications_enabled = ?, event_notifications = ?, 
                personal_notifications = ?, game_notifications = ?, last_login = ?, is_verified = ?, school_id = ?
            WHERE id = ?
        `;

        db.run(updateUserSql, [
            name, surname, grade, letter, image, level, coins, points, type_of_user, area,
            notifications_enabled, event_notifications, personal_notifications, game_notifications,
            last_login || new Date().toISOString(), is_verified, school_id, id
        ], function (err) {
            if (err) {
                console.error('Failed to update user:', err);
                return res.status(500).json({ error: 'Failed to update user' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json({ message: 'User updated successfully' });
        });
    }

    // Удаление пользователя
    async deleteUser(req, res) {
        const { id } = req.body;

        const deleteSql = "DELETE FROM users WHERE id = ?";

        db.run(deleteSql, [id], function (err) {
            if (err) {
                console.error('Failed to delete user:', err);
                return res.status(500).json({ error: 'Failed to delete user' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json({ message: 'User deleted successfully' });
        });
    }

    // Получение всех пользователей
    async getAllUsers(req, res) {
        const sql = "SELECT * FROM users";

        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            return res.json(rows);
        });
    }
}

module.exports = new UserController();