"use strict";
const Antl = use("Antl");
class CreateBet {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      cart: "required",
      totalPrice: "required",
    };
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = CreateBet;
