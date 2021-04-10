class Utils {
	createTestPromisse(){

		let resolvePromise

		const testPromise = new Promise(resolve => {
			resolvePromise = resolve
		})

		return {
			testPromise, resolvePromise
		}
	}
}


module.exports = new Utils()