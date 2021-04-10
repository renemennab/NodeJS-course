const DataCRUD = require('../lib/DataCRUD')
const Utils = require('./utils')


const testFileDir = 'testFiles'
const testFileName = 'testFile'
const testFileContent = { content: 'this is a test' }

describe('TEST CRUD METHODS', () => {
	describe('CREATING', () => {
		test('creates successfully if file doesn\'t exist', async () => {

			let promise = Utils.createTestPromisse()
			DataCRUD.create(testFileDir, testFileName, testFileContent, promise.resolvePromise)
			expect(await promise.testPromise).toStrictEqual(false)


		})
		test('return message if it aleady exists', async () => {

			let promise = Utils.createTestPromisse()
			DataCRUD.create(testFileDir, testFileName, testFileContent, promise.resolvePromise)
			expect(await promise.testPromise).toStrictEqual('Could not create new file, it may already exist')

		})
	})

	describe('READING', () => {
		test('file has right content', async () => {
			let promise = Utils.createTestPromisse()

			DataCRUD.read('testFiles', 'testFile', promise.resolvePromise)
			expect(await promise.testPromise).toStrictEqual({ data: JSON.stringify(testFileContent), 'err': null })
		})
		test('trying to read from a directory that doesn\t exist returns an error', async () => {
			let promise = Utils.createTestPromisse()

			DataCRUD.read('foo', 'testFile', promise.resolvePromise)
			const ret = await promise.testPromise
			expect(ret.err).toBeTruthy()
		})
		test('trying to read file that doesn\t exist returns an error', async () => {
			let promise = Utils.createTestPromisse()

			DataCRUD.read('testFiles', 'foo', promise.resolvePromise)
			const ret = await promise.testPromise
			expect(ret.err).toBeTruthy()
		})
	})

	describe('UPDATING', () => {
		const updatedContent = { data: 'this is still a test' }
		test('updates successfully if file exists', async () => {

			let promise = Utils.createTestPromisse()
			DataCRUD.update(testFileDir, testFileName, updatedContent, promise.resolvePromise)
			expect(await promise.testPromise).toStrictEqual(false)
            
			promise = Utils.createTestPromisse()
			DataCRUD.read('testFiles', 'testFile', promise.resolvePromise)
			expect(await promise.testPromise).toStrictEqual({ data: JSON.stringify(updatedContent), 'err': null })

		})
		test('return message if file doesn\t exist', async () => {

			let promise = Utils.createTestPromisse()
			DataCRUD.update('foo', testFileName, testFileContent, promise.resolvePromise)
			expect(await promise.testPromise).toStrictEqual('Could not update file, it may not yet exist')

		})
	})

	describe('DELETING', () => {
		test('deletes if it exists', async () => {

			let promise = Utils.createTestPromisse()
			DataCRUD.delete('testFiles', 'testFile', promise.resolvePromise)
			expect(await promise.testPromise).toBe(false)
		})
		test('returns message if it doesn\t', async () => {

			let promise = Utils.createTestPromisse()
			DataCRUD.delete('testFiles', 'testFile', promise.resolvePromise)
			expect(await promise.testPromise).toBe('error deleting file')
		})

	})
	test('getDataPath returns the correct path', () => {
		const path = DataCRUD.getDataPath(testFileDir, testFileName)
		expect(path).toBe(__dirname.replace('tests', '') + '.data/testFiles/testFile.json')
	})
})