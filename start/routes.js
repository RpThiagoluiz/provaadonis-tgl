"use strict";

const Route = use("Route");

//User Route
Route.post("/users", "UserController.store").validator("User");
Route.get("/users", "UserController.index");

Route.delete("/users/:id", "UserController.destroy");

//Sessions
Route.post("/sessions", "SessionController.store").validator("Session");

//Forget Password
Route.post("/forgetpassword", "ForgotpasswordController.store").validator(
  "ForgotPassword"
);
Route.put("/forgetpassword", "ForgotpasswordController.update").validator(
  "ResetPassword"
);

//Route.get("/game", "GameController.index");
Route.group(() => {
  //User
  Route.get("/users/:id", "UserController.show");
  Route.put("/users/:id", "UserController.update");
  //Game Routes -> not be tested yet
  Route.post("/game", "GameController.store").validator("CreateGame");
  Route.get("/game", "GameController.index");
  Route.get("/game/:id", "GameController.show");
  Route.put("/game/:id", "GameController.update").validator("CreateGame");
  Route.delete("/game/:id", "GameController.destroy");

  //Bets Routes
  Route.post("/bets", "BetController.store").validator("CreateBet");
  Route.get("/bets", "BetController.index");
  Route.get("/bets/:id", "BetController.show");
  Route.put("/bets/:id", "BetController.update").validator("UpdateBet");
  Route.delete("/bets/:id", "BetController.destroy");
}).middleware(["auth"]);

//Route.resource('game', "GameController").apiOnly()
