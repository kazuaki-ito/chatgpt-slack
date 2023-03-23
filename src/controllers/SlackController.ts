import {WebClient} from '@slack/web-api'
import env from "../env"
import {OpenAIApi, Configuration, ChatCompletionRequestMessageRoleEnum} from 'openai'

const web = new WebClient(env.slackBotToken)

const openAiApi = new OpenAIApi(new Configuration({
  apiKey: env.chatgptApiKey
}))

class SlackController {
  public async onMessage(event: any): Promise<void> {
    if (event.bot_id) return
    console.log(`onMessage event: user ${event.user} in channel ${event.channel} says ${event.text}`)
    try {
      const completion = await openAiApi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: event.text
        }]
      })
      if (completion.data.choices.length > 0 && completion.data.choices[0].message?.content) {
        await web.chat.postMessage({
          text: `<@${event.user}>\n` +
            '> ' + event.text +
            completion.data.choices[0].message!.content,
          channel: event.channel
        })
        return
      }
    } catch (e) {
      console.error(e)
    }
    await web.chat.postMessage({
      text: 'なに言ってんの？わかんねーよ',
      channel: event.channel
    })
  }
}

export default new SlackController()