"use strict";

const Database = use("Database");
const User = use("App/Models/User");

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
      const trx = await Database.beginTransaction();
      const user = await User.create(data, trx);
      await trx.commit();
      return user;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
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
      return response
        .status(error.status)
        .send({
          error: {
            message: `Erro ao deletar o usuario, olhe a lista para conferir se esse id existe.`,
          },
        });
    }
  }
}

module.exports = UserController;
