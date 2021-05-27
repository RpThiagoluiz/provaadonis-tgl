"use strict";
const Antl = use("Antl");
class UpdateBet {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      numbers: "required",
    };
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = UpdateBet;
