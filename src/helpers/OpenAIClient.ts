import {ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi} from "openai"
import env from "../env"

const openAiApi = new OpenAIApi(new Configuration({
  apiKey: env.chatgptApiKey
}))

class OpenAIClient {
  public async createChatCompletion(message: string): Promise<string | undefined> {
    const completion = await openAiApi.createChatCompletion({
      model: env.chatgptModel!,
      messages: [{
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: message
      }]
    })
    if (completion.data.choices.length > 0 && completion.data.choices[0].message?.content) {
      return completion.data.choices[0].message!.content
    }
    return undefined
  }
}

export default new OpenAIClient()