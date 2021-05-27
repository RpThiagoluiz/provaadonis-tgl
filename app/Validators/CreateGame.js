"use strict";
const Antl = use("Antl");
class CreateGame {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      type: "required|unique:games",
      description: "required",
      range: "required",
      price: "required",
      ["max-number"]: "required",
      color: "required",
      ["min-cart-value"]: "required",
    };
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = CreateGame;
