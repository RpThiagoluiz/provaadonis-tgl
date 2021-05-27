"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });

    this.addHook("afterCreate", "UserHook.sendUserNewEmail");
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }

  bets() {
    return this.hasMany("App/Models/Bet");
  }
}

module.exports = User;
