'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function (db) {
	db.createTable('users', {
		id: {
			type: 'int',
			unsigned: true,
			notNull: true,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: 'string',
			notNull: true,
			length: 150
		},
		email: {
			type: 'string',
			notNull: true,
			unique: true,
			length: 150
		},
		password: {
			type: 'string',
			notNull: true,
			length: 250
		},
		photo: {
			type: 'string',
			length: 500
		},
		updated_at: {
			type: 'timestamp',
			notNull: true,
			defaultValue: new String('CURRENT_TIMESTAMP')
		},
		created_at: {
			type: 'timestamp',
			notNull: true,
			defaultValue: new String('CURRENT_TIMESTAMP')
		}
	});
	return null;
};

exports.down = function (db) {
	db.dropTable('users');
	return null;
};

exports._meta = {
	"version": 1
};
