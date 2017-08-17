require('dotenv-safe').load()

const devConfig = {
  MONGO_URI: process.env.MONGO_URI_DEV
}

const testConfig = {
  MONGO_URI: process.env.MONGO_URI_DEV
}

const prodConfig = {
  MONGO_URI: process.env.MONGO_URI_PROD
}

const defaultConfig = {
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  FB_ID: process.env.FB_ID,
  FB_SECRET: process.env.FB_SECRET,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  NGROK_URL: process.env.NGROK_URL,
  NOW_URL: process.env.NOW_URL, // NOTE: Comes from 'now-cli' upon deployment
  PORT: process.env.PORT || 3000,
  TWITTER_KEY: process.env.TWITTER_KEY,
  TWITTER_SECRET: process.env.TWITTER_SECRET
}

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig
    case 'test':
      return testConfig
    default:
      return prodConfig
  }
}

module.exports = {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
}
