/**
 * Primary file for the API 
*/

// Dependencies
const http = require('http')

// The server should respond to all requests with a string
const server = http.createServer((req, res)=> {

    // Get parsed url obj
    const url = new URL(req.url, `http://${req.headers.host}`)

    // Get the path from the url
    const path = url.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')

    // Get the HTTP method
    const method = req.method.toLowerCase()

    // Get query params
    const params = url.searchParams

    // Send the response
    res.end('Hello World\n')

    // Log the request path
    console.log('Reques received on path:', trimmedPath)
    console.log('Request method:', method)
    console.log('Query params:', params)

})

//Start the server, and have it listen on port 3000
server.listen(3000, ()=> {
    console.log("The server is listening on port 3000 now")
})