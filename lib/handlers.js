/**
 * Request handlers
 */
const UserAPI = require('./UserAPI')

// Define the handlers 
const handlers = {}

// users handler
handlers.users = (data, callback) => {
	const method = data.method
	if (UserAPI[method]) {
		UserAPI[method](data, callback)
	} else {
		callback(405)
	}
}

// Ping handler
handlers.ping = (data, callback) => {
	//Callback a http status code, and a payload object
	callback(200)
}

// Not found handler
handlers.notFound = (data, callback) => {
	callback(404)
}

module.exports = handlers