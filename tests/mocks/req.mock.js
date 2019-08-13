const req = {
  body: {},
  errors: {},
  checkBody(fieldName, errorMessage) {
    if (typeof this.body[fieldName] === 'undefined') {
      this.errors[fieldName] = errorMessage;
    }

    return {
      ...this,
      isLength: ({ min }) => {
        if (this.body[fieldName].length < min) {
          this.errors[`${fieldName}Length`] = `should not be less than ${min}`;
        }

        return {
          ...this,
          trim: () => ({
            ...this,
            notEmpty: () => {
              if (this.body[fieldName] === '') {
                this.errors[fieldName] = 'should not be empty';
              }

              return this;
            },
          }),
        };
      },
    };
  },
  validationErrors() {
    if (Object.keys(this.errors).length === 0) return null;
    return this.errors;
  },
};

module.exports = req;
