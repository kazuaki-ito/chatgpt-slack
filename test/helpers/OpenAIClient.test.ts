import chatHistoryRepos, {ChatHistory} from "../../src/repositories/redis/ChatHistoryRepos"
import openAIClient, {CONTENT_LIMIT} from "../../src/helpers/OpenAIClient"
import {ChatCompletionRequestMessageRoleEnum} from "openai";

describe('OpenAIClient', (): void => {
  beforeEach(async () => {
    await chatHistoryRepos.clear()
  })

  test('garbageCollect', async () => {
    const histories: ChatHistory[] = []
    for (let i = 0; i < CONTENT_LIMIT * 2; i++) {
      histories.push({
        id: '1',
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `content-${i}`
      })
    }

    const result = openAIClient.garbageCollect(histories)
    expect(result.length).toEqual(CONTENT_LIMIT)
    expect(result[0].content).toEqual(`content-${CONTENT_LIMIT}`)
    expect(result[CONTENT_LIMIT - 1].content).toEqual(`content-${CONTENT_LIMIT * 2 - 1}`)
  })

  test('createCompletion', async () => {
    const threadId = '1'
    {
      const result1 = await openAIClient.question(threadId, 'カープのエースは？')
      console.info(result1)
      const result2 = await openAIClient.question(threadId, 'カープのエースは大世良です')
      console.info(result2)
      const result3 = await openAIClient.question(threadId, 'カープのエースは？')
      console.info(result3)
    }
    {
      const result4 = await openAIClient.question(threadId, 'ぬるぽ')
      console.info(result4)
      const result5 = await openAIClient.question(threadId, '「ぬるぽ」には「ガッ」返してください')
      console.info(result5)
      const result6 = await openAIClient.question(threadId, 'ぬるぽ')
      console.info(result6)
    }
  }, 60 * 1000)
})