module.exports = class extends think.Logic {
  indexAction() {
    const rules = {
      account: {
        required: true
      },
      pwd: {
        required: true
      }
    };
    if (!this.validate(rules)) {
      this.failParams();
      return false;
    }
  }
};
