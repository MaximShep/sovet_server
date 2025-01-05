const express = require('express')
const usersRouter = require('./routes/users.routes.js')
const schoolsRouter = require('./routes/schools.routes.js')
const notificationsRouter = require('./routes/notifications.routes.js')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080

const app = express()

app.use(bodyParser.json())
app.use('/api',usersRouter)
app.use('/api',schoolsRouter)
app.use('/api',notificationsRouter)



app.listen(PORT, () => console.log(`Сервер запущен с портом: ${PORT}`))
