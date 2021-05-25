"use strict";

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
}

module.exports = CreateBet;
