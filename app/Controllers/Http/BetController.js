"use strict";
//user que fez o game
const User = use("App/Models/User");
//Do game
const Bet = use("App/Models/Bet");

const Game = use("App/Models/Game");
//Send user Email
const Mail = use("Mail");

class BetController {
  async index({ request, response, auth }) {
    try {
      const bets = await Bet.query()
        .where({ user_id: auth.user.id })
        .with("game")
        .fetch();
      return bets;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }

  async store({ request, response, auth }) {
    try {
      const { cart, totalPrice } = request.only(["cart", "totalPrice"]);

      const userId = auth.user.id;
      const user = await User.findByOrFail({ id: userId }); //user for email data

      //Map ?

      const userGames = [];

      for (let index = 0; index < cart.length; index++) {
        //Check Cart - ifs
        // const user = await Bet.findBy({
        //   user_id: cart[i].user_id,
        //   numbers: cart[i].numbers,
        // });
        const game = await Game.findByOrFail({ id: cart[index].game_id });
        console.log(game);
        if (totalPrice < game["min-cart-value"]) {
          return response.status(400).send({
            error: {
              message: `Valor minimo nao atingido, ${game["min-cart-value"]}`,
            },
          });
        }
        const userBets = { ...cart[index], user_id: auth.user.id };
        userGames.push(userBets);
      }

      const recentBets = await Bet.createMany(userGames);

      //Send Email for Bets

      return recentBets;
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: error.message } });
    }
  }

  async show({ params, request, response, view }) {
    try {
      const bet = await Bet.findOrFail(params.id);
      await bet.load("game");
      return bet;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: `Game Inexistente!`,
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(["numbers", "game_id"]);
      //const bet = await Bet.query().where("id", params.id).findOrFail();
      const bet = await Bet.findOrFail(params.id);

      bet.merge(data);
      await bet.save();
      return bet;
    } catch (error) {
      return response.status(400).send({ error: { message: error.message } });
    }
  }

  async destroy({ params, request, response }) {
    try {
      const bet = await Bet.findByOrFail("id", params.id);
      await bet.delete();
      return response
        .status(200)
        .send({ success: { message: `Game Deletado com sucesso` } });
    } catch (error) {
      return response.status(400).send({ error: { message: error.message } });
    }
  }
}

module.exports = BetController;
