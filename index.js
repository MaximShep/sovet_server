const express = require('express')
const usersRouter = require('./routes/users.routes.js')
const schoolsRouter = require('./routes/schools.routes.js')
const notificationsRouter = require('./routes/notifications.routes.js')
const storiesRouter = require('./routes/stories.routes.js')
const storyViewsRouter = require('./routes/story_views.routes.js')
const pollsRouter = require('./routes/polls.routes.js')
const pollResponsesRouter = require('./routes/poll_responses.routes.js')
const postsRouter = require('./routes/posts.routes.js')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080

const app = express()

app.use(bodyParser.json())
app.use('/api',usersRouter)
app.use('/api',schoolsRouter)
app.use('/api',notificationsRouter)
app.use('/api',storiesRouter)
app.use('/api',storyViewsRouter)
app.use('/api',pollsRouter)
app.use('/api',pollResponsesRouter)
app.use('/api',postsRouter)



app.listen(PORT, () => console.log(`Сервер запущен с портом: ${PORT}`))
