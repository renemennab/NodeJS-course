/**
 * Helpers for various tasks
 */

const crypto = require('crypto')
const config = require('./config')

class Helpers {

	/**
     *  create a SHA256 hash
 * @param {string} str 
 * @returns a hashed string or false
     */
	hash(str){
		if (typeof str === 'string' && str.length){
			return crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex')
		} else {
			return false
		}
        
	}
    
	// Parse a JSON string to an object in all cases, without throwing
	parseJsonToObj(str){
		try{
			return JSON.parse(str)
		} catch(e) {
			return {}
		}
	}
    
}

module.exports = new Helpers()

