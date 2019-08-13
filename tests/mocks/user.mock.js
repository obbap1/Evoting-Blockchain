function User(user = {}) {
  this.firstname = user.firstname;
  this.lastname = user.firstname;
  this.email = user.email;
  this.password = user.password;
  this.passport = user.passport;

  this.save = callback => new Promise((resolve, reject) => {
    this._id = User.users.length + 1;
    User.users.push(this);
    callback();
    resolve(callback);
  });
}

User.users = [];

// ProductCategory.findOne = ({ name }) => Promise.resolve(
//   (ProductCategory.categories || []).find(category => category.name === name),
// );

module.exports = User;
