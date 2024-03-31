import pkg from 'pg'

const { Client } = pkg;

const client = new Client({
    host: 'localhost',
    port: 5433,
    database: 'application',
    user: 'sasha',
    password: 'qwerty'
});

await client.connect()


export default client;