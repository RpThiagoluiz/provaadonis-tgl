"use strict";

const Game = use("App/Models/Game");

class GameController {
  async index({ request, response, view }) {
    try {
      const games = await Game.query().fetch();
      return games;
    } catch (error) {
      return response.status(error.status).send({
        error: { message: error.message },
      });
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only([
        "type",
        "description",
        "range",
        "price",
        "max-number",
        "color",
        "min-cart-value",
      ]);

      //const trx = await Database.beginTransaction();
      const createGame = await Game.create({ ...data });
      //await trx.commit();
      return createGame;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: `Game ja cadastrado` } });
    }
  }

  async show({ params, request, response, view }) {
    try {
      //Or game type.
      const game = await Game.findOrFail(params.id);
      return game;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }

  async update({ params, request, response }) {
    try {
      const game = await Game.findOrFail(params.id);
      const data = request.only([
        "type",
        "description",
        "range",
        "price",
        "max-number",
        "color",
        "min-cart-value",
      ]);
      game.merge(data);
      await game.save();
      return game;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const game = await Game.findOrFail(params.id);
      await game.delete();
      return response
        .status(200)
        .send(`Game ${params.id} deletado com sucesso!`);
    } catch (error) {
      return response
        .status(error.status)
        .send(
          `Erro ao deletar o game de id ${params.id}, verifique se o game existe na lista de games. `
        );
    }
  }
}

module.exports = GameController;
