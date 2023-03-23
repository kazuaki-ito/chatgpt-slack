import express from 'express'
import slackController from './controllers/SlackController'
import {createEventAdapter} from '@slack/events-api'
import env from './env'

const app = express()
const port = process.env.PORT || 3001
const slackEvents = createEventAdapter(env.slackSigningSecret!)

app.use('/slack/events', slackEvents.requestListener())
slackEvents.on('message', slackController.onMessage)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
