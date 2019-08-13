const res = {
  code: 0,
  data: null,
  status(code) {
    this.code = code;
    return this;
  },
  send(data) {
    this.data = data;
    return this;
  },
};

module.exports = res;
