import {Model} from "objection";

export default class Data extends Model {
    static get tableName() {
        return "application_data"
    }

    static get idColumn() {
        return 'code';
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "url"],
            properties: {
                name: {type: "string", maxLength: 255},
                url: {type: "string", maxLength: 255},
                code: {type: "string", maxLength: 5},
                shorturl: {type: "string"},
                userid: {type: "number"},
            }
        }
    }
}
