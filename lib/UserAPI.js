const DataCRUD = require('./DataCRUD')
const Helpers = require('./Helpers')
const _ = require('lodash')

class UserAPI{
	/**
	 * Creates a new user
	 * @param {{firstName: string, lastName: string, phone: string, password: string, tosAgreement: boolean}} data 
	 * @param {*} callback 
	 */
	post(data, callback) {
		const firstName = this.verifyString(_.get(data, 'payload.firstName', ''), 0)
		const lastName = this.verifyString(_.get(data, 'payload.lastName', ''), 0)
		const phone = this.verifyString(_.get(data, 'payload.phone', ''), 10, 12)
		const password = this.verifyString(_.get(data, 'payload.password', ''), 0)
		const tosAgreement = _.get(data, 'payload.tosAgreement', false) === true

		// Check if all values are valid
		if(!firstName || !lastName || !phone || !password || !tosAgreement) return 	callback(400, {Error: 'Missing required fields'})

		// Hash the password
		const hashedPassword = Helpers.hash(password)
		if (!hashedPassword) return callback(500, {Error: 'Could not hash the user\'s password'})

		// create user object
		const userObject = {
			firstName,
			lastName,
			phone,
			hashedPassword,
			tosAgreement
		}


		// Make sure the user doesn't exist

		//try reding
		DataCRUD.read('users', phone, ({err}) => {
		// if there is an error it means the file doesn't exist, so it is ok to create it
			if(err){
				DataCRUD.create('users', phone, userObject, err => {
					if(err){
						callback(500, {Error: 'Could not create the new user'})
						console.log(err)
					} else{
						callback(200)
					}
				})
			} else {
			// if there isn't an error it means the file already exists
				callback(400, { Error: 'A user with that phone number already exists'})
			}
		})

	}

	// get(data, callback) {

	// }

	// put(data, callback) {

	// }

	// deleteUser (data, callback) {

	// }

	get requiredDataFields() {return   ['firstName', 'lastName', 'phone', 'password', 'tosAgreement']}

	/**
	 * Checks if data is string and if it is bigger than the min length and smaller than max length
	 * @param {*} string 
	 * @param {*} minLength 
	 * @param {*} maxLength - inclusive 
	 * @returns if no problems are found it returns the string, else it returns false
	 */
	verifyString(string, minLength, maxLength = Infinity) {
		if (typeof string !== 'string') return false
	
		const length = string.trim().replace(/\s/g, '').length

		if (typeof minLength === 'number' && length < minLength) return false

		if (maxLength && length > maxLength) return false

		return string
	}

}


module.exports = new UserAPI()