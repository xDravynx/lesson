const express = require('express')
const cors = require('cors')
const app = express()
const routeHandler = require('./routes')


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!', success: true })
});

app.use('/api/v1', routeHandler)

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found'})
})

module.exports = app