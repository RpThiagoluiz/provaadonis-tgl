"use strict";

class UpdateBet {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      numbers: "required",
    };
  }
}

module.exports = UpdateBet;
