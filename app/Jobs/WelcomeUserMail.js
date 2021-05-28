"use strict";

const Mail = use("Mail");

class WelcomeUserMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "WelcomeUserMail-job";
  }

  // This is where the work is done.
  async handle({ username, email }) {
    console.log(`Job: ${WelcomeUserMail.key}`);

    await Mail.send(
      ["emails.user", "emails.user-txt"],
      {
        name: username,
        link: `http://localhost:3000/`,
      },
      (message) => {
        message
          .to(email)
          .from("admin@thi.com", "Admin | TGL")
          .subject("Bem vindo!");
      }
    );
  }
}

module.exports = WelcomeUserMail;
