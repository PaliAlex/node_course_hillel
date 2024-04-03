import Users from "../entity/Users.js";
import client from "../postgress/client-knex.js";

export default class UserRepository {
    async save(user) {
        await Users.query().insert({
            name: user.name,
            password:user.password,
            email: user.email,
        });
    }

    async get(userId) {
        return Users.query().findById(userId);
    }

    async getAll() {
        return Users.query();
    }

    async getByName(name) {
        return Users.query().where('name', name);
    }
}
