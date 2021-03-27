/**
 * Create and export configurations that depend on node variables
 * This code is responsable for taking the variables passed down through the 
 * NODE_ENV variable in the command line and deciding how to act acordingly
 */

const environmentOptions = {}

// default environment
environmentOptions.staging = { 
    port: 3000,
    id: 'staging'
}

environmentOptions.production = {
    port: 5000,
    id: 'production'
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
