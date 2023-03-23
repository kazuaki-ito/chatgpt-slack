const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackBotToken = process.env.SLACK_BOT_TOKEN
const chatgptApiKey = process.env.CHATGPT_API_KEY
export default {
  slackSigningSecret,
  slackBotToken,
  chatgptApiKey
}