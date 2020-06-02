const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const app = express()

const server = http.createServer(app)
const io = socketio(server, {
  transports: ['websocket', 'polling']
})
const osUtils = require('os-utils');

const osu = require('node-os-utils')
const cpu = osu.cpu
const drive = osu.drive



// // for deployment

// const path = require('path')
// const dist = path.join(__dirname, '../dist')

const router = require('./config/router')

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

osUtils.cpuUsage((value) => console.log(`CPU Usage (%): ${value}`))

osUtils.cpuFree((value) => console.log(`cpu free: ${value}`))
console.log(`platform: ${osUtils.platform()}`)
console.log(`freemem: ${osUtils.freemem()}`)
console.log(`totalmem: ${osUtils.totalmem()}`)
console.log(`freememPercentage: ${osUtils.freememPercentage()}`)
console.log(`sysUptime: ${osUtils.sysUptime()}`)
console.log(`processUptime: ${osUtils.processUptime()}`)
console.log(`cpu count: ${osUtils.cpuCount()}`)

console.log(`average load for 1 minutes: ${osUtils.loadavg(1)}`)
console.log(`average load for 5 minutes: ${osUtils.loadavg(5)}`)
console.log(`average load for 15 minutes: ${osUtils.loadavg(15)}`)

console.log(`cpu model`, cpu.model())

osu.drive.info()
  .then(info => {
    console.log('hdddrive:', info)
  })
  .catch(err => console.log(err))

osu.drive.free()
  .then(info => {
    console.log('hdddrive free:', info)
  })
  .catch(err => console.log(err))

// var netstat = osu.netstat

osu.netstat.inOut()
  .then(info => {
    console.log(info)
  })
  .catch(err => console.log(err))

osu.mem.info()
  .then(info => console.log('mem', info))
  .catch(err => console.log(err))


osu.openfiles.openFd()
  .then(info => console.log('mem', info))
  .catch(err => console.log('openfiles', err))

osu.os.oos()
  .then(info => console.log('platform', info))
  .catch(err => console.log('osu.os.oos()', err))

console.log('playt', osu.os.platform())

console.log('IP', osu.os.ip())
console.log('Hostname', osu.os.hostname())
console.log('OS TYPE', osu.os.type())
console.log('OS ARCH', osu.os.arch())

io.on('connection', client => {
  setInterval(() => {
    osUtils.cpuUsage((cpuPercent) => {
      client.emit('cpuPercent', {
        value: cpuPercent,
        name: 'cpuPercent'
      })
    })
  }, 1000)
  osUtils.cpuUsage((freeMemoryPercentage) => {
    client.emit('freeMemoryPercentage', [{
      value: Number((freeMemoryPercentage * 100).toFixed(2)),
      name: 'freeMemoryPercentage'
    }, {
      value: Number(((1 - freeMemoryPercentage) * 100).toFixed(2)),
      name: 'usedMemoryPercentage'
    }])
  })
})


// for development
app.use('/', router)

// // for deployment
// app.use('/', express.static(dist))

// // for deployment
// app.get('*', function(req, res) {
//   res.sendFile(path.join(dist, 'index.html'))
// });

server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))