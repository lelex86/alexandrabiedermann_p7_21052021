const db = require("../config/db");
const sanitize = require("../config/sanitize");
const bcrypt= require("bcrypt");

class User{

static create = (user, callback) => {
  db.query("INSERT INTO users SET username=?, email=?, password=?, user_id=?", [user.username, user.userfirstname, user.email, user.password], (error, result)=>{
    callback(error,result);
  });
};

}

module.exports = mongoose.model("User", userSchema);
