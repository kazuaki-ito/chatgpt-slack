import * as IORedis from 'ioredis'
import env from '../../env'

export interface ChatHistory {
  id: string
  role: string
  content: string
}

class ChatHistoryRepos {
  private readonly redis: IORedis.Redis
  private isDestroyed = false

  constructor() {
    this.redis = new IORedis.Redis(env.redisPort, env.redisHost)
  }

  public async store(key: string, chatHistory: ChatHistory[]) {
    if (this.isDestroyed) throw new Error('Already destroyed ')

    await this.redis.set(key, JSON.stringify(chatHistory))
  }

  public async get(key: string): Promise<ChatHistory[]> {
    if (this.isDestroyed) throw new Error('Already destroyed ')

    const result = await this.redis.get(key)
    if (!result) return []
    return JSON.parse(result) as ChatHistory[]
  }

  public async clear() {
    if (this.isDestroyed) throw new Error('Already destroyed ')

    const keys = await this.redis.keys('*')
    if (keys.length < 1) return
    await this.redis.del(keys)
  }

  public destroy() {
    if (this.isDestroyed) return
    this.redis.disconnect()
    this.isDestroyed = true
  }

}

export default new ChatHistoryRepos()