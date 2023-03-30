import chatHistoryRepos, {ChatHistory} from "../../src/repositories/redis/ChatHistoryRepos"
import {ChatCompletionRequestMessageRoleEnum} from "openai"

const ID = '1'
const TEST_DATA_COUNT = 20
describe('ChatHistoryRepos', (): void => {
  beforeEach(async () => {
    await chatHistoryRepos.clear()
  })

  test('check', async () => {
    // setup testdata
    const histories: ChatHistory[] = []
    for (let i = 0; i < TEST_DATA_COUNT / 2; i++) {
      const time = new Date().getTime()
      histories.push({
        id: ID,
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `content-${time}`
      })
      histories.push({
        id: ID,
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: `content-${time}`
      })
    }
    await chatHistoryRepos.store(ID, histories)

    // get test
    expect((await chatHistoryRepos.get(ID)).length).toEqual(TEST_DATA_COUNT)
  })
})