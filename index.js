/**
 * Primary file for the API 
*/

// Dependencies
const http = require('http')

// The server should respond to all requests with a string
const server = http.createServer((req, res)=> {

    // Get the path from the url
    const trimmedPath = req.url.replace(/^\/+|\/+$/g, '')

    // Get the HTTP method
    const method = req.method.toLowerCase()

    // Send the response
    res.end('Hello World\n')

    // Log the request path
    console.log('Reques received on path: ', trimmedPath, 'with this method: ', method)

})

//Start the server, and have it listen on port 3000
server.listen(3000, ()=> {
    console.log("The server is listening on port 3000 now")
})