const Define = require("../../config/define");

module.exports = class extends think.Logic {
  addAction() {
    const rules = {
      images: {
        required: true,
        array: true
      },
      status: {
        required: true,
        int: true
      },
      place: {
        string: true,
        default: "",
        trim: true
      },
      note: {
        string: true,
        default: "",
        trim: true
      }
    };
    if (!this.validate(rules)) {
      this.failParams();
      return false;
    }
    if (!this.post("images").length) {
      this.failErr("图片不能为空");
      return false;
    }
  }

  getListAction() {
    const config = {
      create_time_start: {
        type: "dateRange",
        dbKey: "created_time",
        startKey: "create_time_start",
        endKey: "create_time_end"
      },
      status: {
        type: "full",
        dbKey: "status"
      },
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

  getAction() {
    const rules = {
      id: {
        required: true
      }
    };
    if (!this.validate(rules)) {
      this.failParams();
      return false;
    }
  }

  setAction() {
    const rules = {
      id: {
        required: true
      },
      image: {
        required: true,
        string: true,
        trim: true
      },
      status: {
        required: true,
        int: true
      },
      place: {
        string: true,
        default: "",
        trim: true
      },
      note: {
        string: true,
        default: "",
        trim: true
      }
    };
    if (!this.validate(rules)) {
      this.failParams();
      return false;
    }
  }

  setBatchAction() {
    const rules = {
      ids: {
        required: true,
        string: true
      },
      status: {
        required: true,
        int: true
      },
      place: {
        string: true,
        default: "",
        trim: true
      },
      note: {
        string: true,
        default: "",
        trim: true
      }
    };
    if (!this.validate(rules)) {
      this.failParams();
      return false;
    }
  }

  statusAction() {
    const rules = {
      ids: {
        required: true,
        string: true,
        trim: true
      },
      status: {
        required: true
      }
    };
    if (!this.validate(rules)) {
      this.failParams();
      return false;
    }
    const status = this.post("status");
    if (
      status !== Define.showStatus.show &&
      status !== Define.showStatus.hide
    ) {
      this.failErr("状态参数非法");
      return false;
    }
  }

  deleteAction() {
    const rules = {
      ids: {
        required: true,
        string: true,
        trim: true
      }
    };
    if (!this.validate(rules)) {
      this.failParams();
      return false;
    }
  }
};
