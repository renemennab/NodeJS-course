const helpers = require('../lib/helpers')

describe('TEST HELPER FUNCTIONS', () => {
	describe('test hash string function', () => {
		test('it fails if argument is not string', () => {
			expect(helpers.hash(1)).toBeFalsy()
			expect(helpers.hash({})).toBeFalsy()
			expect(helpers.hash(null)).toBeFalsy()
		})
		test('it fails if string is empty', () => {
			expect(helpers.hash('')).toBeFalsy()
		})
		test('it hashes a string', () => {
			expect(helpers.hash('hello')).toBe('d3d8ff766691a951aa3bf48e000443b7e17d3e0c71719d4a747ce958fc1a038e')
		})
	}) 
	describe('test parse json to obj function', () => {
		test('it fails if argument is not parseble', () => {
			expect(helpers.parseJsonToObj({value: true})).toStrictEqual({})
			expect(helpers.parseJsonToObj({})).toStrictEqual({})
			expect(helpers.parseJsonToObj('hello world')).toStrictEqual({})
		})
		test('it parses json strings', () => {
			expect(helpers.parseJsonToObj('{"greeting": "hello world"}')).toStrictEqual({greeting: 'hello world'})
		})
	}) 
})