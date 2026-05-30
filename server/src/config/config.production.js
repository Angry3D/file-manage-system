// production config, it will load in production enviroment
const Env = require('./env');

module.exports = {
  workers: 0,
  port: Env.getInt('BABYLIFE_SERVER_PORT', 20000)
};
