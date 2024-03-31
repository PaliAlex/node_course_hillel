import postgresClient from '../postgress/client.js';

export default class UserRepository {
    async save(user) {
        const query = {
            text: 'INSERT INTO application_users(name, email, password ) VALUES($1, $2, $3)',
            values: [user.name, user.email, user.password ],
        };

        await postgresClient.query(query);
    }

    async get(userId) {
        const query = {
            text: 'SELECT * FROM application_users WHERE id = $1',
            values: [userId],
        };

        return await postgresClient.query(query);
    }

    async getAll() {
        const query = 'SELECT * FROM application_users';
        const users = await postgresClient.query(query);

        return users.rows;
    }

    async getByName(name) {
        const query = {
            text: 'SELECT * FROM application_users WHERE name = $1',
            values: [name],
        };

        const user = await postgresClient.query(query);

        return user.rows[0];
    }
}
