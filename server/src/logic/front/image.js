module.exports = class extends think.Logic {
  getListAction() {
    const config = {
      place: {
        type: "fuzzy",
        dbKey: "place"
      },
      note: {
        type: "fuzzy",
        dbKey: "note"
      }
    };
    this.ctx.state.params = this.parsePageParams(this.post(), config);
    // console.log("logic", this.ctx.state.params);
  }
};
