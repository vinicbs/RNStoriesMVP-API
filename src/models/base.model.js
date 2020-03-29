const { Model } = require('objection');
const VisibilityPlugin = require('objection-visibility').default;
const { DBErrors } = require('objection-db-errors');

module.exports = class BaseModel extends DBErrors(VisibilityPlugin(Model)) { }