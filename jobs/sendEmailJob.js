import { Queue, Worker } from "bullmq";
import { defaultQueueConfig, redisConnection } from "../config/queue.js";
import logger from "../config/logger.js";
import { sendEmail } from "../config/mail.js";

export const emailQueueName = "email-queue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueConfig,
});

//Workers
export const handler = new Worker(
  emailQueueName,
  async (job) => {
    // console.log("the email worker data is ", job.data);

    const data = job.data;

    data?.map(async (i) => {
      await sendEmail(i.toEmail, i.subject, i.body);
    });
  },
  { connection: redisConnection }
);

//Workers listner
handler.on("completed", (job) => {
  logger.info({ job: job, message: "Job completed" });
});

handler.on("failed", (job) => {
  logger.info({ job: job, message: "Job failed" });
});
