const Knex = require('knex');
const connection = require('../../knexfile');
const BaseModel = require('./base.model');
const User = require('./user.model');
const knexConnection = Knex(connection);
BaseModel.knex(knexConnection);

module.exports = class Story extends BaseModel {
    static get tableName() {
        return 'stories';
    }

    static get relationMappings() {
        return {
            users: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'stories.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}