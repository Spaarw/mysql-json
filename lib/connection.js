/**
 * @author Sparw Jenkins
 * @description MYSQL-JSON CONNECTION MODULE
 * @date 05/07/2017
 */

"use strict";

var Mysql = require('mysql');

module.exports = function (host) {

	var _self = this;

	/**
	 * CONNECT
	 * Used to open connection to host
	 * @param {Function} callback
	 */
	_self.connect = function (callback) {
		var connection = Mysql.createConnection(host);
		connection.connect(function (err) {
			callback(err, connection);
		});
	};

	/**
	 * QUERY
	 * Used to launch a Mysql query
	 * @param mysqlQuery
	 * @param {Function} callback
	 */
	_self.query = function (mysqlQuery, callback) {
		_self.connect(function (err, connection) {
			if (err) {
				callback(err, null);
			}
			else {
				connection.query(mysqlQuery, function (err, response) {
					connection.end();
					if (err) {
						callback(err, null);
					}
					else {
						callback(null, response);
					}
				});
			}
		});
	};


	/**
	 * FIND BY PRIMARY KEY
	 * Used to query for a single record by primary key
	 * @param {String} tableName
	 * @param {String|Number} id
	 * @param {Function} callback
	 */
	_self.findByPrimaryKey = function (tableName, id, callback) {
		if (tableName && id) {
			var primaryKeyQuery = 'SHOW KEYS FROM `' + tableName + '` WHERE Key_name = \'PRIMARY\'';
			_self.query(primaryKeyQuery, function (err, res) {
				if (err) {
					callback(err, null);
				}
				else {
					var primaryKeyId = Object.get(res, '0.Column_name') || 'id';
					var mysqlQuery = 'SELECT * FROM `' + tableName + '` WHERE ' + primaryKeyId + '=' + JSON.stringify(id);
					_self.query(mysqlQuery, function(err, rows) {
						if (err) {
							callback(err, null);
						}
						else {
							callback(null, rows && rows.length ? rows[0] : []);
						}
					});
				}
			});
		}
		else {
			callback(new Error('mysql-json [findByPrimaryKey]: Require at least a tableName and a valid id'), null);
		}
	};


	/**
	 * INSERT
	 * Used to build and launch a Mysql insert query
	 * @param {String} tableName
	 * @param {Object} dataToInsert
	 * @param {Function} callback
	 */
	_self.insert = function (tableName, dataToInsert, callback) {
		if (tableName && dataToInsert) {
			if (Object.size(dataToInsert) > 0) {
				var mysqlQuery = 'INSERT INTO `' + tableName + '` (';
				var i = 0;
				for (var index in dataToInsert) {
					mysqlQuery += index;
					mysqlQuery += (i + 1 == Object.size(dataToInsert) ? ') ' : ', ');
					i++;
				}
				i = 0;
				mysqlQuery += 'VALUES (';
				for (index in dataToInsert) {
					mysqlQuery += typeof(dataToInsert[index]) == 'string' ? '"' + dataToInsert[index].replace(/"/g, '\\"') + '"' : dataToInsert[index];
					mysqlQuery += (i + 1 == Object.size(dataToInsert) ? ') ' : ', ');
					i++;
				}
				_self.query(mysqlQuery, callback);
			}
			else {
				callback(new Error('mysql-json [insert]: data has to contain at least one field'), null);
			}
		}
		else {
			callback(new Error('mysql-json [insert]: Require at least a tableName and a data'), null);
		}
	};


	/**
	 * UPDATE
	 * Used to build and launch a Mysql update query
	 * @param {String} tableName
	 * @param {Object} data
	 * @param {Object} conditions
	 * @param {Function} callback
	 */
	_self.update = function (tableName, data, conditions, callback) {
		if (tableName && data) {
			if (Object.size(data) > 0) {
				var mysqlQuery = 'UPDATE `' + tableName + '` SET ';
				var i = 0;
				for (var index in data) {
					mysqlQuery += index + '';
					mysqlQuery += '=';
					mysqlQuery += typeof(data[index]) == 'string' ? '"' + data[index].replace(/"/g, '\\"') + '"' : data[index];
					mysqlQuery += (i + 1 == Object.size(data) ? ' ' : ', ');
					i++;
				}
				i = 0;
				if (conditions) {
					mysqlQuery += 'WHERE ';
					for (index in conditions) {
						mysqlQuery += index;
						mysqlQuery += " ";
						mysqlQuery += (conditions[index].operator || '=');
						mysqlQuery += " ";
						mysqlQuery += typeof(conditions[index].value) == 'string' ? '"' + conditions[index].value.replace(/"/g, '\\"') + '"' : conditions[index].value;
						mysqlQuery += (i + 1 == Object.size(conditions) ? ' ' : ' AND ');
						i++;
					}
				}
				_self.query(mysqlQuery, callback);
			}
			else {
				callback(new Error('mysql-json [update]: data has to contain at least one field'), null);
			}
		}
		else {
			callback(new Error('mysql-json [update]: Require at least a tableName and a data'), null);
		}
	};


	/**
	 * DELETE
	 * Used to build and launch a delete Mysql query
	 * @param {String} tableName
	 * @param {Object} conditions
	 * @param {Function} callback
	 */
	_self.delete = function (tableName, conditions, callback) {
		if (tableName) {
			var mysqlQuery = "DELETE FROM `" + tableName + "` ";
			if (conditions) {
				mysqlQuery += "WHERE ";
				var i = 0;
				for (var index in conditions) {
					mysqlQuery += index;
					mysqlQuery += " ";
					mysqlQuery += (conditions[index].operator || "=");
					mysqlQuery += " ";
					mysqlQuery += typeof(conditions[index].value) == 'string' ? '"' + conditions[index].value.replace(/"/g, '\\"') + '"' : conditions[index].value;
					mysqlQuery += (i + 1 == Object.size(conditions) ? " " : " AND ");
					i++;
				}
			}
			_self.query(mysqlQuery, callback);
		}
		else {
			callback(new Error('mysql-json [delete]: Require at least a tableName'), null);
		}
	};


};
