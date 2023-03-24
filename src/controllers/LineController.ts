import lineHelper from "../helpers/LineHelper"
import openAIClient from "../helpers/OpenAIClient";

const client = lineHelper.getClient()


class LineController {
  public async onEvent(event: any) {
    console.info(`onEvent. type:${event.type}`)
    console.info(event)

    try {
      if (event.type == 'message' && event.message?.type === 'text') {
        const result = await openAIClient.createChatCompletion(event.message.text)
        if (result) {
          await client.replyMessage(event.replyToken, {
            type: 'text',
            text: result
          })
          return
        }
      }
    } catch (e) {
      console.error(e)
    }

    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'ごめんなさい、答えられません。'
    })
  }
}

export default new LineController()