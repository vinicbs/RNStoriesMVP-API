const Knex = require('knex');
const connection = require('../../knexfile');
const BaseModel = require('./base.model');
const Story = require('./story.model');
const knexConnection = Knex(connection);
BaseModel.knex(knexConnection);

module.exports = class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    static get hidden() {
        return ['password']
    }

    static get relationMappings() {
        return {
            stories: {
                relation: BaseModel.HasManyRelation,
                modelClass: Story,
                join: {
                    from: 'users.id',
                    to: 'stories.user_id'
                }
            }
        }
    }
}