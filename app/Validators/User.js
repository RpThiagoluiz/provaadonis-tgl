"use strict";

class User {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      username: "required",
      email: "required|email|unique:users",
      //password: "required|confirmed",
      password: "required",
    };
  }
}

module.exports = User;
