/**
 *  Library for storing and editing data
 * 
 */

const fs = require('fs')
const path = require('path')

// Container for the module to be exported
class Lib {

	/**
	 * This method writes data to a file
	 * @param {string} dir - name of the target directory 
	 * @param {string} file - name of file to be written
	 * @param {Object} data - content of the file
	 * @param {Function} callback - function that recieves an error to be displayed to the user if it receives false it means there wan no error
	 */
	create(dir, file, data, callback) {
		fs.open(this.getDataPath(dir, file), 'wx', (err, fileId) => this.openHandler(err, fileId, data, callback, 'create'))
	}

	/**
	 * Update data inside a file
	 */
	update(dir, file, data, callback) {
		fs.open(this.getDataPath(dir, file), 'r+', (err, fileId) => this.openHandler(err, fileId, data, callback, 'update'))
	}

	/**
	 * Read data from file
	 */
	read(dir, file, callback) {
		fs.readFile(this.getDataPath(dir, file), 'utf-8', (err, data) => {
			callback(err, data)
		})
	}

	/**
	 * Delete a file
	 */
	delete(dir, file, callback) {
		fs.unlink(this.getDataPath(dir, file), err => {
			err ? callback('error deleting file') : callback(false)
		})
	}


	openHandler(err, fileId, data, callback, type) {
		let errorMessage

		switch (type) {
		case 'update':
			errorMessage = 'Could not update file, it may not yet exist'
			break
		case 'create':
			errorMessage = 'Could not create new file, it may already exist'
			break
		}

		if (err || !fileId) {
			callback(errorMessage)
			return
		}

		if (type === 'update') {
			const truncateError = this.truncateFile(fileId, callback)

			if (truncateError) return
		}

		const dataAsString = JSON.stringify(data)
		this.writeFile(fileId, dataAsString, callback)
	}

	// delete file content if any
	truncateFile(fileId, callback) {
		let errorWhileTruncating = false
		fs.ftruncate(fileId, err => {
			if (err) {
				errorWhileTruncating = true
				callback('Error truncating file')
			}
		})
		return errorWhileTruncating
	}

	// Write to file and close it
	writeFile(fileId, dataAsString, callback) {
		fs.writeFile(fileId, dataAsString, (err) => {
			err ? callback('Error writing to file') : this.closeFile(fileId, callback)
		})
	}

	closeFile(fileId, callback) {
		fs.close(fileId, (err) => {
			err ? callback('Error closing file') : callback(false)
		})
	}

	getDataPath(dir, file) {
		return `${this.baseDir + dir}/${file}.json`
	}

	get baseDir() {
		const pathToData = '/../.data/'
		return path.join(__dirname, pathToData)
	}
}

module.exports = Lib