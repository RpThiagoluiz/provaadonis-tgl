"use strict";

class SessionController {
  async store({ request, response, auth }) {
    try {
      //Email - password on try login
      const { email, password } = request.all();

      const token = await auth.attempt(email, password);

      return token;
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

  async update({ request, response, auth }) {}
}

module.exports = SessionController;
