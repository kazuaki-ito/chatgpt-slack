import {ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi} from "openai"
import env from "../env"
import chatHistoryRepos, {ChatHistory} from "../repositories/redis/ChatHistoryRepos";

const openAiApi = new OpenAIApi(new Configuration({
  apiKey: env.chatgptApiKey
}))

export const CONTENT_LIMIT = 20

class OpenAIClient {
  public garbageCollect(histories: ChatHistory[]): ChatHistory[] {
    while (histories.length > CONTENT_LIMIT) {
      histories.shift()
    }
    return histories
  }

  public async question(threadId: string, message: string) {
    const histories = await chatHistoryRepos.get(threadId)
    histories.push({
      id: threadId,
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: message
    })

    const messages = histories.map(history => {
      return {
        role: history.role,
        content: history.content
      } as ChatCompletionRequestMessage
    })
    const result = await this.createChatCompletion(messages)
    if (result) {
      histories.push({
        id: threadId,
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: result
      })
      await chatHistoryRepos.store(threadId, this.garbageCollect(histories))
    }
    return result
  }

  private async createChatCompletion(messages: ChatCompletionRequestMessage[]): Promise<string | undefined> {
    const completion = await openAiApi.createChatCompletion({
      model: env.chatgptModel!,
      messages,
      top_p: 0.5,
      frequency_penalty: 0.5,
      max_tokens: 1024
    })
    if (completion.data.choices.length > 0 && completion.data.choices[0].message?.content) {
      return completion.data.choices[0].message!.content
    }
    return undefined
  }
}

export default new OpenAIClient()