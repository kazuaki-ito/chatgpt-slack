import {WebClient} from '@slack/web-api'
import env from "../env"
import openAIClient from "../helpers/OpenAIClient"

const web = new WebClient(env.slackBotToken)

class SlackController {
  public async onMessage(event: any): Promise<void> {
    if (event.bot_id) return
    console.log(`onMessage event: user ${event.user} in channel ${event.channel} says ${event.text}, model=${env.chatgptModel}`)
    try {
      const result = await openAIClient.question(event.channel, event.text)
      if (result) {
        await web.chat.postMessage({
          text: `<@${event.user}>\n` +
            '> ' + event.text + '\n' +
            result,
          channel: event.channel
        })
        return
      }
    } catch (e) {
      console.error(e)
    }
    await web.chat.postMessage({
      text: `<@${event.user}>\n` +
        '> ' + event.text + '\n' +
        'ごめんなさい、答えられません。',
      channel: event.channel
    })
  }
}

export default new SlackController()