import {Model} from "objection";

export default class Users extends Model {
    static get tableName() {
        return "application_users"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "email", "password"],
            properties: {
                name: {type: "string", maxLength: 255},
                password: {type: "string"},
                email: {type: "string", maxLength: 255},
            }
        }
    }
}
