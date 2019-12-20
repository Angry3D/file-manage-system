class Enum {
  constructor(map) {
    this.map = map;
  }
  getOptions() {
    const ret = [];
    for (const key in this.map) {
      ret.push({ key: key, value: this.map[key] });
    }
    return ret;
  }
  getValue(key) {
    return this.map[key];
  }
}

// 展示状态
const ShowStatus = new Enum({
  1: "展示",
  2: "隐藏"
});

// exports
export { ShowStatus };
