"use strict";

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  "@adonisjs/framework/providers/AppProvider",
  "@adonisjs/auth/providers/AuthProvider",
  "@adonisjs/bodyparser/providers/BodyParserProvider",
  "@adonisjs/cors/providers/CorsProvider",
  "@adonisjs/lucid/providers/LucidProvider",

  //Email
  "@adonisjs/mail/providers/MailProvider",
  //Views -> Email model
  "@adonisjs/framework/providers/ViewProvider",
  //Validators
  "@adonisjs/validator/providers/ValidatorProvider",
  //Redis
  "@adonisjs/redis/providers/RedisProvider",
  //kue
  "adonis-kue/providers/KueProvider",
  //Internacionalizacao de Errors
  "@adonisjs/antl/providers/AntlProvider",
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  "@adonisjs/lucid/providers/MigrationsProvider",
  "adonis-kue/providers/CommandsProvider",
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

/*
|--------------------------------------------------------------------------
| jobs
|--------------------------------------------------------------------------
|
| Here you store  your keu jobs
|
*/

const jobs = ["App/Jobs/WelcomeUserMail"];

module.exports = { providers, aceProviders, aliases, commands, jobs };
