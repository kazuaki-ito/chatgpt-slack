const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackBotToken = process.env.SLACK_BOT_TOKEN
const chatgptApiKey = process.env.CHATGPT_API_KEY
const chatgptModel = process.env.CHATGPT_MODEL
export default {
  slackSigningSecret,
  slackBotToken,
  chatgptApiKey,
  chatgptModel
}