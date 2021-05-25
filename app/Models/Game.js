"use strict";

const Model = use("Model");

class Game extends Model {
  //bets hasMany
  bets() {
    return this.hasMany("App/Models/Bet");
  }
}

module.exports = Game;
