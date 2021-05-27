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
      //Can try for type

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
      const formatedGames = [];

      for (let index = 0; index < cart.length; index++) {
        //Check Cart - ifs
        // const user = await Bet.findBy({
        //   user_id: cart[i].user_id,
        //   numbers: cart[i].numbers,
        // });
        const game = await Game.findByOrFail({ id: cart[index].game_id });
        const mapNumbers = cart[index].numbers;
        const duplicate = new Set(mapNumbers);
        const changeStringBetNumbersInNumber = mapNumbers.map((el) =>
          Number(el)
        );
        const maxNumber = changeStringBetNumbersInNumber.reduce((a, b) =>
          Math.max(a, b)
        ); //MaxNumber
        const minNumber = changeStringBetNumbersInNumber.reduce((a, b) =>
          Math.min(a, b)
        );

        if (totalPrice < game["min-cart-value"]) {
          return response.status(400).send({
            error: {
              message: `Valor minimo nao atingido, ${game["min-cart-value"]}`,
            },
          });
        }

        if (game["max-number"] !== mapNumbers.length) {
          return response.status(400).send({
            error: {
              message: `Quantidade de numeros incorreta, ${game["max-number"]}`,
            },
          });
        }

        if (maxNumber > game.range) {
          return response.status(400).send({
            error: {
              message: `O maior valor valido para esse game ${game.type} é ${game.range}`,
            },
          });
        }

        if (minNumber <= 0) {
          return response.status(400).send({
            error: {
              message: `O menor valor valido para todos os games é 1`,
            },
          });
        }

        if (mapNumbers.length !== duplicate.size) {
          return response.status(400).send({
            error: {
              message: `Numeros duplicados no game, ${game.type} - ${mapNumbers}`,
            },
          });
        }

        const userBets = { ...cart[index], user_id: auth.user.id };
        userGames.push(userBets);

        //Format userGames for e-mail
        formatedGames.push({
          type: game.type,
          color: game.color,
          numbers: cart[index].numbers,
          price: cart[index].price,
        });
      }

      const recentBets = await Bet.createMany(userGames);

      //Send Email for Bets
      await Mail.send(
        ["emails.bets", "emails.bets-txt"],
        {
          name: user.username,
          games: formatedGames,
          total: totalPrice, //formatar o valor
        },
        (message) => {
          message
            .to(user.email)
            .from("admin@thi.com", "Admin | TGL")
            .subject("Nova Bet Realizada");
        }
      );

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
      await bet.load("user");
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
