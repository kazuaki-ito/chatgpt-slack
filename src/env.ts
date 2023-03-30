const slackSigningSecret = process.env.SLACK_SIGNING_SECRET || ''
const slackBotToken = process.env.SLACK_BOT_TOKEN || ''
const lineChannelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN || ''
const lineChannelSecret = process.env.LINE_CHANNEL_SECRET || ''
const chatgptApiKey = process.env.CHATGPT_API_KEY || ''
const chatgptModel = process.env.CHATGPT_MODEL || ''
const redisPort = process.env.REDIS_PORT || ''
const redisHost = process.env.REDIS_HOST || ''
export default {
  slackSigningSecret,
  slackBotToken,
  lineChannelAccessToken,
  lineChannelSecret,
  chatgptApiKey,
  chatgptModel,
  redisHost,
  redisPort: Number(redisPort)
}