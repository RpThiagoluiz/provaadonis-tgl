"use strict";

const User = use("App/Models/User");
class SessionController {
  async store({ request, response, auth }) {
    try {
      //Email - password on try login
      const { email, password } = request.all();
      const user = await User.findByOrFail("email", email);

      const token = await auth.attempt(email, password);

      return { user, token };
      //Token do front end
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message:
            "Algo de inexperado aconteceu! Verifique os dados, e tente novamente.",
        },
      });
    }
  }
}

module.exports = SessionController;
