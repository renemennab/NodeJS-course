/**
 * Primary file for the API 
*/

// Dependencies
const http = require('http')
const https = require('https')
const StringDecoder = require('string_decoder').StringDecoder
const envConfigs = require('./config')
const fs = require('fs')

// Instatiate the http server
const httpServer = http.createServer((req, res) => {
    configureServer(req, res)
})

// start http server
httpServer.listen(envConfigs.httpPort, () => {
    console.log(`The server is listening on port ${envConfigs.httpPort} in ${envConfigs.id} mode`)
})

// Instatiate the https server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem')
}

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
    configureServer(req, res)
})

// start https server
httpsServer.listen(envConfigs.httpsPort, () => {
    console.log(`The server is listening on port ${envConfigs.httpsPort} in ${envConfigs.id} mode`)
})

/**
 * This function unifies the logic from the servers so it can be used for both http and https
 */
function configureServer(req, res) {
    // Get parsed url obj
    const url = new URL(req.url, `http://${req.headers.host}`)

    // Get the path from the url
    const path = url.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')

    // Get the HTTP method
    const method = req.method.toLowerCase()

    // Get the headers as an object
    const headers = req.headers

    // Get query params
    const params = url.searchParams

    //Get payload, if any
    const decoder = new StringDecoder('utf-8')
    let buffer = ''

    // This func calls the callback every time new payload data arrives
    req.on('data', data => buffer += decoder.write(data))

    // This func runs after the last bit of data from the payload arrives
    req.on('end', () => {
        buffer += decoder.end()

        // Choose the handler, if one is not found choose the Not Found handler
        const chosenHandler = router[trimmedPath] !== undefined ? router[trimmedPath] : handlers.notFound

        // Data object to be sent to the handler
        const data = {
            trimmedPath,
            params,
            method,
            headers,
            payload: buffer
        }

        // Call chosen handler to get the correct status code and payload
        chosenHandler(data, (statusCode, handlerPayload) => {
            // If status code is not a number default to 200
            const status = typeof statusCode === 'number' ? statusCode : 200

            // If payload returns empty, default to an empty object
            const payload = typeof handlerPayload === 'object' ? handlerPayload : {}

            // To be sent in the response, the payload needs to be a string
            const payloadString = JSON.stringify(payload)

            // Return the response
            res.setHeader('content-type', 'application/json')
            res.writeHead(status)
            res.end(payloadString)

            // Log the request response
            console.log('Reques received this response:', status, payloadString)
        })

    })
}

// Define the handlers 
const handlers = {}

// Ping handler
handlers.ping = (data, callback) => {
    //Callback a http status code, and a payload object
    callback(200)
}

// Not found handler
handlers.notFound = (data, callback) => {
    callback(404)
}

const router = {
    ping: handlers.ping
}