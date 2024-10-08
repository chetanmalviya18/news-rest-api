import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import bcrypt from "bcrypt";
import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/mail.js";
import logger from "../config/logger.js";
import { emailQueue, emailQueueName } from "../jobs/sendEmailJob.js";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      //check if email exits
      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser)
        return res.status(400).json({
          errors: {
            email: "Email already taken please use another one.",
          },
        });

      //Encrypt the password
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);
      const user = await prisma.users.create({
        data: payload,
      });

      return res.json({
        status: 200,
        message: "User created successfully",
        user,
      });
    } catch (error) {
      // console.log("Error in register => ", error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again.",
        });
      }
    }
  }

  static async login(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      //find user with email
      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser) {
        if (!bcrypt.compareSync(payload.password, findUser.password))
          return res
            .status(400)
            .json({ errors: { email: "Invalid Credentials" } });

        //Issue token to user
        const payloadData = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          profile: findUser.profile,
        };
        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return res.json({
          message: "logged in",
          access_token: `Bearer ${token}`,
        });
      }

      return res.status(400).json({
        errors: {
          email: "No user found with this email.",
        },
      });
    } catch (error) {
      // console.log("Error in login => ", error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again.",
        });
      }
    }
  }

  //send email
  static async sendMail(req, res) {
    try {
      const { email } = req.query;

      const payload = [
        {
          toEmail: email,
          subject: "Hey i am just testing",
          body: "<h1>Hello world, I am from news_backend</h1>",
        },
        {
          toEmail: email,
          subject: "Are you stduent?",
          body: "<h1>We have amazing offers for students</h1>",
        },
        {
          toEmail: email,
          subject: "This is final",
          body: "<h1>Finally this project will end soon</h1>",
        },
      ];

      await emailQueue.add(emailQueueName, payload);

      return res.json({ status: 200, message: "Job added successfully." });
    } catch (error) {
      logger.error({ type: "Email error", body: error });
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
    }
  }
}

export default AuthController;
