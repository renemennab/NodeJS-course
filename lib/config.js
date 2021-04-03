/**
 * Create and export configurations that depend on node variables
 * This code is responsable for taking the variables passed down through the 
 * NODE_ENV variable in the command line and deciding how to act acordingly
 */

const environmentOptions = {}

// default environment
environmentOptions.staging = { 
	httpPort: 3000,
	httpsPort: 3001,
	id: 'staging',
}

environmentOptions.production = {
	httpPort: 5000,
	httpsPort: 5001,
	id: 'production',
}

/**
 * Determine the environment that was passed as argument in the command line
 * check if it is a string to avoid errors
 *  */
const requestedEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

/**
 * If the requested environment does not exist, defualt to staging
 */
const environmentToLaunch = environmentOptions[requestedEnvironment] || environmentOptions.staging

module.exports = environmentToLaunch
