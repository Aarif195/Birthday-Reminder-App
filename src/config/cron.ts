import cron from "node-cron";
import { checkAndSendBirthdays } from "../services/birthdayService";

export const initCronJobs = () => {
  // '0 7 * * *' runs every day at 07:00
  cron.schedule("*/3 * * * *", async () => {
    console.log("Running daily birthday check at 7:00 AM...");
    await checkAndSendBirthdays();
  });
};