/**
 * @author Sparw Jenkins
 * @description MYSQL-JSON INDEX FILE
 * @date 05/07/2017
 */

"use strict";

require('./lib/toolsbox');
var Connection = require('./lib/connection');

/**
 *
 * @param host
 * @returns {module.exports}
 */
module.exports = function(host) {

	if (host) {
		return new Connection(host);
	}
	else {
		throw new Error('mysql-json : require host parameter');
	}

};