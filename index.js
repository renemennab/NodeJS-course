/**
 * Primary file for the API 
*/

// Dependencies
const http = require('http')
const StringDecoder = require('string_decoder').StringDecoder

// The server should respond to all requests with a string
const server = http.createServer((req, res)=> {

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
    req.on('end', ()=> {
        buffer += decoder.end()

        // Send the response
        res.end('Hello World\n')
    
        // Log the request path
        console.log('Reques received this payload:', buffer)

    })

})

//Start the server, and have it listen on port 3000
server.listen(3000, ()=> {
    console.log("The server is listening on port 3000 now")
})