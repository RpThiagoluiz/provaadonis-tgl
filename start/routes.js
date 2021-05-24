"use strict";

const Route = use("Route");

//User Route
Route.post("/users", "UserController.store");
