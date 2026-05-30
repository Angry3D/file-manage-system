// default config
const Env = require('./env');

module.exports = {
  workers: 1,
  port: Env.getInt('BABYLIFE_SERVER_PORT', 20000)
};
