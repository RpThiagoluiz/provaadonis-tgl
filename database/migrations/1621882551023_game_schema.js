"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GameSchema extends Schema {
  up() {
    this.create("games", (table) => {
      table.increments();
      table.string("type", 20).notNullable().unique(); // max 20 characters
      table.text("description").notNullable();
      table.integer("range").notNullable();
      table.decimal("price").notNullable();
      //Adds a float column, with optional precision (defaults to 8) and scale (defaults to 2).
      // decimal — table.decimal(column, [precision], [scale])
      //Doc Knex -> https://knexjs.org/#Schema-decimal
      table.integer("max-number").notNullable();
      table.string("color").notNullable();
      table.integer("min-cart-value").defaultTo(30); //Min game price
      table.timestamps();
    });
  }

  down() {
    this.drop("games");
  }
}

module.exports = GameSchema;
