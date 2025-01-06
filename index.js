const express = require('express')
const usersRouter = require('./routes/users.routes.js')
const schoolsRouter = require('./routes/schools.routes.js')
const notificationsRouter = require('./routes/notifications.routes.js')
const storiesRouter = require('./routes/stories.routes.js')
const storyViewsRouter = require('./routes/story_views.routes.js')
const pollsRouter = require('./routes/polls.routes.js')
const pollResponsesRouter = require('./routes/poll_responses.routes.js')
const postsRouter = require('./routes/posts.routes.js')
const postLikesRouter = require('./routes/posts_likes.routes.js')
const commentsRouter = require('./routes/comments.routes.js')
const commentLikesRouter = require('./routes/comments_likes.routes.js')
const transactionRouter = require('./routes/transactions.routes.js')
const progressRouter = require('./routes/progress.routes.js')
const goalRouter = require('./routes/goals.routes.js')
const presidentRouter = require('./routes/presidents.routes.js')
const graduateRouter = require('./routes/graduates.routes.js')
const projectRouter = require('./routes/projects.routes.js')
const bodyParser = require('body-parser');
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");

const PORT = process.env.PORT || 8080

const app = express()

//загрузка изображения на сервер
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/images", express.static("uploads/images"));
app.use("/api", uploadRoutes);


app.use(bodyParser.json())
app.use('/api',usersRouter)
app.use('/api',schoolsRouter)
app.use('/api',notificationsRouter)
app.use('/api',storiesRouter)
app.use('/api',storyViewsRouter)
app.use('/api',pollsRouter)
app.use('/api',pollResponsesRouter)
app.use('/api',postsRouter)
app.use('/api',postLikesRouter)
app.use('/api',commentsRouter)
app.use('/api',commentLikesRouter)
app.use('/api',transactionRouter)
app.use('/api',goalRouter)
app.use('/api',progressRouter)
app.use('/api',presidentRouter)
app.use('/api',graduateRouter)
app.use('/api',projectRouter)



app.listen(PORT, () => console.log(`Сервер запущен с портом: ${PORT}`))
