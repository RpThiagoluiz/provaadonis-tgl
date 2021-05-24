"use strict";

const User = use("App/Models/User");
//const Mail = use("Mail");
const crypto = require("crypto");
const moment = require("moment");

class ForgotpasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      await user.save();
      return `Email enviado com sucesso`;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: "Email nao cadastrado.",
        },
      });
    }
  }
}

module.exports = ForgotpasswordController;
