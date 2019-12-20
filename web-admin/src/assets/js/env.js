const env = {};

if (process.env.BUILD_ENV == "development") {
  env.API_BASE_URL = "http://localhost:20000/";
} else if (process.env.BUILD_ENV == "production") {
  env.API_BASE_URL = "http://babyapi.relaxcoder.top/";
}

export default env;
