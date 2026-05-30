function get(name, fallback) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    return fallback;
  }
  return value;
}

function getInt(name, fallback) {
  const value = parseInt(get(name, fallback), 10);
  return Number.isNaN(value) ? fallback : value;
}

module.exports = {
  get,
  getInt
};
