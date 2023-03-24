import * as Line from "@line/bot-sdk"
import env from "../env"

const config = {
  channelSecret: env.lineChannelSecret,
  channelAccessToken: env.lineChannelAccessToken
}
const lineClient = new Line.Client(config)

class LineHelper {
  getMiddlewareConfig(): Line.MiddlewareConfig {
    return config
  }

  getClient() {
    return lineClient
  }
}

export default new LineHelper()