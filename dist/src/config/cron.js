"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCronJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const birthdayService_1 = require("../services/birthdayService");
const initCronJobs = () => {
    // '0 7 * * *' runs every day at 07:00
    node_cron_1.default.schedule("0 7 * * *", async () => {
        console.log("Running daily birthday check at 7:00 AM...");
        await (0, birthdayService_1.checkAndSendBirthdays)();
    });
};
exports.initCronJobs = initCronJobs;
