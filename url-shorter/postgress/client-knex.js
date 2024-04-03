import knex from 'knex';
import {Model} from "objection";

const client = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5433,
        user: 'sasha',
        password: 'qwerty',
        database: 'application',
    },
    pool:{
        min: 2,
        max:10
    }
});

Model.knex(client);

export default client