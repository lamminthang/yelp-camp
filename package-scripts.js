const npsUtils = require('nps-utils')

const { crossEnv, series } = npsUtils

module.exports = {
  scripts: {
    commit: 'git cz',
    default: 'nps',
    lint: {
      default: 'eslint',
      fix: series.nps('lint --fix')
    },
    server: {
      default: `${crossEnv('NODE_ENV=production')} nodemon index.js`,
      dev: `${crossEnv('NODE_ENV=development')} nodemon index.js`
    }
  }
}
