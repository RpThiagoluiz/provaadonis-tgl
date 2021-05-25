"use strict";

const Database = use("Database");
const User = use("App/Models/User");
const Mail = use("Mail");

class UserController {
  async index({ response }) {
    try {
      const users = await User.query().fetch();
      return users;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }

  async show({ response, params, auth }) {
    try {
      const user = await User.findByOrFail("id", auth.user.id);
      // const user = await User.findOrFail(params.id) | or just for parms in Route;

      //Await for auth user, when, load this user game
      //await user.load('games')
      return user;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only(["username", "email", "password"]);
      const { username, email, password } = data;
      const isEmptyName = username.trim().length < 3;

      if (isEmptyName) {
        return response.status(400).send({
          error: { message: `Username deve conter pelo menos 3 caracteres` },
        });
      }

      const regexValidEmail = /^[\w+.]*@\w+.(?:[A-Z]{2,})?.[\w\w]*$/.test(
        email
      );
      const isEmptyEmail = email.trim() === "";
      if (!regexValidEmail || isEmptyEmail) {
        return response.status(400).send({
          error: { message: `Email Invalido !` },
        });
      }
      const isMinChars = password.trim().length >= 6;
      if (!isMinChars) {
        return response.status(400).send({
          error: { message: `Password deve conter mais que 6 caracteres!` },
        });
      }

      const trx = await Database.beginTransaction();
      const user = await User.create(data, trx);
      await trx.commit();

      //Email to new user
      await Mail.send(
        ["emails.user", "emails.user-txt"],
        {
          name: username,
          link: `http://localhost:3000/session`,
        },
        (message) => {
          message
            .to(email)
            .from("admin@thi.com", "Admin | TGL")
            .subject("Bem vindo!");
        }
      );

      return user;
    } catch (error) {
      return response
        .status(400)
        .send({ error: { message: `Usuario ou email ja cadastrado` } });
    }
  }

  async update({ request, response, auth }) {
    try {
      const user = await User.findByOrFail("id", auth.user.id);
      const data = request.only(["username", "email", "password"]);
      user.merge(data);
      await user.save();
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }

  async destroy({ params, response }) {
    try {
      //Just Admin can delete ?
      const user = await User.findOrFail(params.id);
      await user.delete();
      return `Usuario ${params.id} deletado com sucesso!`;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: `Erro ao deletar o usuario, olhe a lista para conferir se esse id existe.`,
        },
      });
    }
  }
}

module.exports = UserController;
