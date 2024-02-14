const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
console.log('EventEmitter created');
const routeEmitter = new EventEmitter();
console.log('RouteEmitter created');

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(`Request recieved for ${url}`);

    // Read HTML file corresponding to the requested route
    fs.readFile(`./views/${url}.html`, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            // Write headers and HTML content
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            // Complete Response
            res.end();

            // Emit event when route is accessed
            routeEmitter.emit('routeAccessed', route);
        }
    });
});

eventEmitter.on('request', (url) => {
    console.log(`Request for ${url}`);
    fs.appendFile('server.log', `Request recieved for ${url}\n`, (err) => {
        if (err) throw err;
        console.log('Activity logged to server.log');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server', err);
    } else {
    console.log(`server is running on port ${PORT}`);
    }
});

// Event listener for routeAccessed event
routeEmitter.on('routeAccessed', (route) => {
    console.log(`Route accessed: ${route}`);
});
