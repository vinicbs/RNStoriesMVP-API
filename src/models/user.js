const Knex = require('knex')
const connection = require('../../knexfile')
const BaseModel = require('./base-model')
const knexConnection = Knex(connection)
BaseModel.knex(knexConnection)

module.exports = class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    static get hidden() {
        return ['password']
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 150 },
                email: { type: 'string', minLength: 1, maxLength: 150 },
                photo: { type: 'string', minLength: 1, maxLength: 500 },
                password: { type: 'string', minLength: 1, maxLength: 250 },
                created_at: { type: 'integer' }
            }
        };
    }

    // static get relationMappings() {
    //     return {
    //         stories: {
    //             relation: BaseModel.HasManyRelation,
    //             modelClass: Story,
    //             join: {
    //                 from: 'ideas.id',
    //                 to: 'comments.ideas_id'
    //             }
    //         }
    //     }
    // }
}