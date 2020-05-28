const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const app = express()

const server = http.createServer(app)
const io = socketio(server)
const os = require('os-utils');


// // for deployment

// const path = require('path')
// const dist = path.join(__dirname, '../dist')

const router = require('./config/router')

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})




os.cpuUsage((value) => console.log(`CPU Usage (%): ${value}`))

os.cpuFree((value) => console.log(`cpu free: ${value}`))
console.log(`platform: ${os.platform()}`)
console.log(`freemem: ${os.freemem()}`)
console.log(`totalmem: ${os.totalmem()}`)
console.log(`freememPercentage: ${os.freememPercentage()}`)
console.log(`sysUptime: ${os.sysUptime()}`)
console.log(`processUptime: ${os.processUptime()}`)
console.log(`cpu count: ${os.cpuCount()}`)

console.log(`average load for 1 minutes: ${os.loadavg(1)}`)
console.log(`average load for 5 minutes: ${os.loadavg(5)}`)
console.log(`average load for 15 minutes: ${os.loadavg(15)}`)

// console.log(`cpuFree: ${os.cpuFree()}`)

// os.countCPUs((value) => console.log(`countCPUs: ${value}`))
// os.freemem((value) => console.log(`freemem: ${value}`))
// os.totalmem((value) => console.log(`totalmem: ${value}`))
// os.freememPercentage((value) => console.log(`freememPercentage: ${value}`))
// os.sysUptime((value) => console.log(`sysUptime: ${value}`))
// os.processUptime((value) => console.log(`processUptime: ${value}`))
// os.cpuFree((value) => console.log(`cpu free: ${value}`))


// for development
app.use('/', router)

// // for deployment
// app.use('/', express.static(dist))

// // for deployment
// app.get('*', function(req, res) {
//   res.sendFile(path.join(dist, 'index.html'))
// });

server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))