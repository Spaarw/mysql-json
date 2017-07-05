/**
 * @author Sparw Jenkins
 * @description MYSQL-JSON CONNECTION MODULE
 * @date 05/07/2017
 */

"use strict";

var Mysql = require('mysql');


module.exports = function(host) {

	var _self = this;

	/**
	 * CONNECT
	 * Used to open connection to host
	 * @param callback
	 */
	_self.connect = function(callback) {
		var connection = Mysql.createConnection(host);
		connection.connect(function (err) {
			callback(err, connection);
		});
	};


	/**
	 * QUERY
	 * Used to launch a Mysql query
	 * @param request
	 * @param callback
	 */
	_self.query = function(request, callback) {
		_self.connect(function(err, connection) {
			if (err) {
				callback(err, null);
			}
			else {
				connection.query(request, function(err, response) {
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
	 * INSERT
	 * Used to build and launch a Mysql insert query
	 * @param tableName
	 * @param data
	 * @param callback
	 */
	_self.insert = function(tableName, data, callback) {
		if (tableName && data) {
			if (Object.size(data) > 0) {
				var request = 'INSERT INTO ' + tableName + ' (';
				var i = 0;
				for (var index in data) {
					request += index;
					request += (i + 1 == Object.size(data) ? ') ' : ', ');
					i++;
				}
				i = 0;
				request += 'VALUES (';
				for (index in data) {
					request += typeof(data[index]) == 'string' ? '"' + data[index].replace(/"/g, '\\"') + '"' : data[index];
					request += (i + 1 == Object.size(data) ? ') ' : ', ');
					i++;
				}
				_self.query(request, callback);
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
	 * @param tableName
	 * @param data
	 * @param conditions
	 * @param callback
	 */
	_self.update = function(tableName, data, conditions, callback) {
		if (tableName && data) {
			if (Object.size(data) > 0) {
				var request = 'UPDATE ' + tableName + ' SET ';
				var i = 0;
				for (var index in data) {
					request += index + '';
					if (data[index].operator == '+=') {
						request += '=' + index + '+';
					}
					else {
						request += (data[index].operator || '=');
					}
					request += data[index].value;
					request += (i + 1 == Object.size(data) ? ' ' : ', ');
					i++;
				}
				i = 0;
				if (conditions) {
					request += 'WHERE ';
					for (index in conditions) {
						request += index;
						request += " ";
						request += (conditions[index].operator || '=');
						request += " ";
						request += conditions[index].value;
						request += (i + 1 == Object.size(conditions) ? ' ' : ' AND ');
						i++;
					}
				}
				_self.query(request, callback);
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
	 * @param tableName
	 * @param conditions
	 * @param callback
	 */
	_self.delete = function(tableName, conditions, callback) {
		if (tableName) {
			var request = "DELETE FROM " + tableName + " ";
			if (conditions) {
				request += "WHERE ";
				var i = 0;
				for (var index in conditions) {
					request += index;
					request += " ";
					request += (conditions[index].operator || "=");
					request += " ";
					request += conditions[index].value;
					request += (i + 1 == Object.size(conditions) ? " " : " AND ");
					i++;
				}
			}
			_self.query(request, callback);
		}
		else {
			callback(new Error('mysql-json [delete]: Require at least a tableName'), null);
		}
	};


};