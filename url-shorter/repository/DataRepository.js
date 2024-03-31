import postgresClient from '../postgress/client.js';

export default class DataRepository {
    async save(data) {
        const {name, url, code, shortUrl, created_time, userId} = data;

        const query = {
            text: 'INSERT INTO application_data(name, url, code, shortUrl, userId) VALUES($1, $2, $3, $4, $5)',
            values: [name, url, code, shortUrl, userId],
        };

        await postgresClient.query(query)
}

    async get(id) {
        const query = {
            text: 'SELECT * FROM application_data WHERE id = $1',
            values: [id],
        };

        const data = await postgresClient.query(query);

        return data.rows[0];
    }

    async getAll() {
        const query = 'SELECT * FROM application_users';
        const data = await postgresClient.query(query);

        return data.rows;
    }
}
