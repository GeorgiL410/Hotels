const config = {
  PORT: 5000,
  DB_URI: 'mongodb://localhost/hotels',
  SALT_ROUNDS: 10,
  SECRET:"wow",
  COOKIE_NAME: 'auth token',
}
module.exports = config;