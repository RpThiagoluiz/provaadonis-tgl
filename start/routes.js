"use strict";

const Route = use("Route");

//User Route
Route.post("/users", "UserController.store");
Route.get("/users", "UserController.index");
Route.get("/users/:id", "UserController.show");
Route.put("/users/:id", "UserController.update");
Route.delete("/users/:id", "UserController.destroy");

//Sessions
Route.post("/sessions", "SessionController.store");

//Forget Password
Route.post("/forgetpassword", "ForgotpasswordController.store");
Route.put("/forgetpassword", "ForgotpasswordController.update");

//Game Routes -> not be tested yet
Route.post("/game", "GameController.store");
Route.get("/game", "GameController.index");
Route.get("/game/:id", "GameController.show");
Route.put("/game/:id", "GameController.update");
Route.delete("/game/:id", "GameController.destroy");

//Bets Routes
