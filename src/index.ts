import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Bindings } from 'hono/types'
import { UserController } from './controller/user-controller'
import { ReviewController } from './controller/review-controller'

const app = new Hono<{ Bindings: Bindings }>()

app.use("*", cors())

// user api
app.post('/api/users/register', UserController.create)
app.get('/api/users', UserController.get)
app.get('/api/users/id/:user-id', UserController.getByUserID)
app.get('/api/users/jenis/:jenis', UserController.getByJenis)
app.get('/api/users/rating/:user-id', UserController.getStar)


// review api
////review of user
app.post('/api/users/:user-id', ReviewController.create)
app.get('/api/reviews/:user-id', ReviewController.get)


// user + review
app.get('/api/users/:user-id/reviews', UserController.getUserAndReviews)
app.get('/api/users/:user-id/n-reviews', UserController.getNumberOfReviews)

//// agree and disagree of review
app.patch('/api/reviews/:review-id/agree', ReviewController.agree)
app.patch('/api/reviews/:review-id/disagree', ReviewController.disagree)

// comment api

export default app