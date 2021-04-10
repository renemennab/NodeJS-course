const DataCRUD = require('./data')
const helpers = require('./helpers')

/**
	 * Creates a new user
	 * @param {{firstName: string, lastName: string, phone: string, password: string, tosAgreement: boolean}} data 
	 * @param {*} callback 
	 */
function post(data, callback) {
	const firstName = verifyString(data.payload.firstName, 0)
	const lastName = verifyString(data.payload.lastName, 0)
	const phone = verifyString(data.payload.phone, 10, 12)
	const password = verifyString(data.payload.password, 0)
	const tosAgreement = data.payload.tosAgreement === true

	// Check if all values are valid
	if(!firstName || !lastName || !phone || !password || !tosAgreement) return 	callback(400, {Error: 'Missing required fields'})

	// Hash the password
	const hashedPassword = helpers.hash(password)
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

function get(data, callback) {

}

function put(data, callback) {

}

function deleteUser (data, callback) {

}

const requiredDataFields =  ['firstName', 'lastName', 'phone', 'password', 'tosAgreement']

/**
	 * Checks if data is string and if it is bigger than the min length
	 * @param {*} string 
	 * @param {*} minLength 
	 * @returns if no problems are found it returns the string, else it returns false
	 */
function verifyString(string, minLength, maxLength = Infinity) {
	if (typeof string !== 'string') return false
	
	const length = string.trim().length

	if (typeof minLength === 'number' && length < minLength) return false

	if (maxLength && length > maxLength) return false

	return string
}



module.exports = {
	post,
	get,
	put,
	deleteUser
}