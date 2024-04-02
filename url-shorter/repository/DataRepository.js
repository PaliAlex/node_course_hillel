import postgresClient from '../postgress/client.js';
import client from "../postgress/client-knex.js";
import Data from "../entity/Data.js";
import Users from "../entity/Users.js";

export default class DataRepository {
    async save(data) {
        const {name, url, code, shortUrl, created_time, userId} = data;

        await Data.query().insert({
            name, url, code, shorturl: shortUrl, userid: userId
        });
}

    async get(id) {
        const data = await Data.query().findById(id);

        return data;
    }

    async getAll() {
        return Data.query();
    }
}
