const UserAPI = require('../lib/UserAPI')

describe('USER API', () => {
	describe('VERIFY STRING', () => {
		test('if param is not a string return false', () => {
			let result = UserAPI.verifyString(24, 2)
			expect(result).toBe(false)

			result = UserAPI.verifyString(true, 2)
			expect(result).toBe(false)
		})
		test('returns false if string is not inside the given min, max range', () => {
			let result = UserAPI.verifyString('123', 1, 2)
			expect(result).toBe(false)

			result = UserAPI.verifyString('123', 4)
			expect(result).toBe(false)

			result = UserAPI.verifyString('1 2 3', 4)
			expect(result).toBe(false)
		})
		test('returns string if inside range and is string', () => {
			let result = UserAPI.verifyString('john', 0)
			expect(result).toBe('john')

			result = UserAPI.verifyString('999999999', 8, 9)
			expect(result).toBe('999999999')

			result = UserAPI.verifyString('password', 6, 8)
			expect(result).toBe('password')
		})
	})
})