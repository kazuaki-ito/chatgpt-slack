import express from 'express'
import slackController from './controllers/SlackController'
import {createEventAdapter} from '@slack/events-api'
import env from './env'
import lineController from "./controllers/LineController"
import * as Line from '@line/bot-sdk'
import lineHelper from "./helpers/LineHelper"

const app = express()
const port = process.env.PORT || 3001
const slackEvents = createEventAdapter(env.slackSigningSecret!)

app.get('/', (req, res) => {
  res.send('ok')
})
// for line
app.post('/line/events', Line.middleware(lineHelper.getMiddlewareConfig()), (req, res) => {
  req.body.events.map(lineController.onEvent)
  res.send()
})
// for slack
app.use('/slack/events', slackEvents.requestListener())
slackEvents.on('message', slackController.onMessage)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
