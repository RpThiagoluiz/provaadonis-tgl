"use strict";

const User = use("App/Models/User");
const Mail = use("Mail");
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

      await Mail.send(
        ["emails.forgot_password", "emails.forgot_password-txt"],
        {
          // const go to html.
          email,

          //link: `${request.input("redirect_url")}?token=${user.token}`
          //This away, when user send, frontend turn request url for redirect him.
          link: `http://localhost:3000/resetpassword?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from("admin@thi.com", "Admin | TGL")
            .subject("Recuperacao de senha");
        }
      );
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: "Email nao cadastrado.",
        },
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: { message: "O Token de recuperacao esta expirado!" },
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
      return response
        .status(200)
        .send({ success: { message: "Senha atualizada com sucesso!" } });
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: `Algo deu errado ao resetar sua senha!`,
        },
      });
    }
  }
}

module.exports = ForgotpasswordController;
