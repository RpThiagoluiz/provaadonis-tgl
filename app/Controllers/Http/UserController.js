"use strict";

const User = use("App/Models/User");

class UserController {
  //Route
  async store({ request, response }) {
    try {
      const data = request.only(["username", "email", "password"]);
      const user = await User.create(data);
      return user;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }
}

module.exports = UserController;
