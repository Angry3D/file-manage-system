module.exports = {
  dbAdmin(table) {
    return this.model("admin/" + table, "admin");
  }
};
