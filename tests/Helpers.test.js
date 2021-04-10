const Helpers = require('../lib/helpers')

describe('TEST HELPER FUNCTIONS', () => {
	describe('test hash string function', () => {
		test('it fails if argument is not string', () => {
			expect(Helpers.hash(1)).toBeFalsy()
			expect(Helpers.hash({})).toBeFalsy()
			expect(Helpers.hash(null)).toBeFalsy()
		})
		test('it fails if string is empty', () => {
			expect(Helpers.hash('')).toBeFalsy()
		})
		test('it hashes a string', () => {
			expect(Helpers.hash('hello')).toBe('d3d8ff766691a951aa3bf48e000443b7e17d3e0c71719d4a747ce958fc1a038e')
		})
	}) 
	describe('test parse json to obj function', () => {
		test('it fails if argument is not parseble', () => {
			expect(Helpers.parseJsonToObj({value: true})).toStrictEqual({})
			expect(Helpers.parseJsonToObj({})).toStrictEqual({})
			expect(Helpers.parseJsonToObj('hello world')).toStrictEqual({})
		})
		test('it parses json strings', () => {
			expect(Helpers.parseJsonToObj('{"greeting": "hello world"}')).toStrictEqual({greeting: 'hello world'})
		})
	}) 
})