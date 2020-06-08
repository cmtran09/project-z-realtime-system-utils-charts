const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const moment = require("moment");


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


const si = require('systeminformation');

// for deployment

const path = require('path')
const dist = path.join(__dirname, '../dist')

const router = require('./config/router')

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

io.on('connection', client => {
  //convert data to percent and 2 decimal places
  setInterval(() => {
    osUtils.cpuUsage((cpuPercent) => {
      client.emit('cpuPercent', {
        value: cpuPercent,
        name: 'tick (2s)'
      })
    })
  }, 2000)
  si.cpu()
    .then(data => {
      client.emit('cpuInformation', {
        manufacturer: data.manufacturer,
        brand: data.brand,
        speed: data.speed,
        speedMax: data.speedmax,
        speedMin: !data.speedmin === true ? 'system not supported' : data.speedmin,
        cores: data.cores,
        physicalCores: data.physicalCores,
      })
    })
    .catch(error => console.error(error));
  si.cpuTemperature()
    .then(data => {
      client.emit('cpuTemperature', {
        mainTemp: data.main === -1 ? 'system not supported' : data.main,
        coresTemp: data.cores.length === 0 ? 'system not supported' : data.cores,
        maxTemp: data.max === -0 ? 'system not supported' : data.max,
      })
    })
  osUtils.cpuUsage((freeMemoryPercentage) => {
    client.emit('freeMemoryPercentage', [{
      value: Number((freeMemoryPercentage * 100).toFixed(2)),
      name: 'freeMemoryPercentage',
      label: 'Free'
    }, {
      value: Number(((1 - freeMemoryPercentage) * 100).toFixed(2)),
      name: 'usedMemoryPercentage',
      label: 'Used'
    }])
  })
  osu.mem.info()
    .then(info => {
      client.emit('ramInfo', info)
      osUtils.cpuUsage((freeMemoryPercentage) => {
        client.emit('freeMemoryPercentage', [{
          value: Number(((1 - freeMemoryPercentage) * 100).toFixed(2)),
          name: 'freeMemoryPercentage',
          label: 'Free',
          free: info.freeMemMb,
          total: info.totalMemMb
        }, {
          value: Number((freeMemoryPercentage * 100).toFixed(2)),
          name: 'usedMemoryPercentage',
          label: 'Used',
          used: info.usedMemMb,
          total: info.totalMemMb
        }])
      })
    })
    .catch(err => console.log(err))
  osu.os.oos()
    .then(info => {
      client.emit('systemData', {
        platform: info,
        hostname: osu.os.hostname(),
        architecture: osu.os.arch(),
        osType: osu.os.type()
      })
    })
    .catch(err => console.log('===osu.os.oos()', err))
  osu.drive.info()
    .then(info => {
      client.emit('diskInfo', info)
    })
    .catch(err => console.log(err))
  client.emit('systemUptime', {
    systemUptimeSeconds: osUtils.sysUptime()
  })
  si.graphics()
    .then(data => {
      client.emit('graphicsAndDisplays', data)
    })
    .catch(err => console.log(err))
  si.battery()
    .then(data => {
      client.emit('batteryData', data)
    })
    .catch(err => console.log(err))
})


// for development
// app.use('/', router)

// // for deployment
app.use('/', express.static(dist))

// // for deployment
app.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'))
});

server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))