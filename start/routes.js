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
