"use strict";

const Kue = use("Kue");
const Job = use("App/Jobs/WelcomeUserMail");

const UserHook = (exports = module.exports = {});

UserHook.sendUserNewEmail = async (userInstance) => {
  if (!userInstance.email && !userInstance.dirty.email) return;

  const { username, email } = await userInstance;

  console.log(`Executou,${username}, ${email}`);

  Kue.dispatch(Job.key, { username, email }, { attempts: 2 });
};
