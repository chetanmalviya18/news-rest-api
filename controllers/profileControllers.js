import prisma from "../DB/db.config.js";
import { generateUniqueID, imageValidator } from "../utils/helper.js";

class profileController {
  static async index(req, res) {
    try {
      const user = req.user;

      return res.status(200).json({ user });
    } catch (error) {
      // console.log("Something went wrong in profileController index function");

      return res.status(500).json({
        error: "Something went wrong ",
      });
    }
  }

  static async store() {}

  static async show() {}

  static async update(req, res) {
    try {
      const { id } = req.params;

      if (!req.files || Object.keys(req.files).length == 0)
        return res
          .status(400)
          .json({ status: 400, message: "Profile image required." });

      const profile = req.files.profile;
      const message = imageValidator(profile?.size, profile?.mimetype);

      if (message !== null)
        return res.status(400).json({
          errors: {
            profile: message,
          },
        });

      const imgExt = profile?.name.split(".");
      const imgName = generateUniqueID() + "." + imgExt[1];
      const uploadPath = process.cwd() + "/public/images/" + imgName;

      profile.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      await prisma.users.update({
        data: {
          profile: imgName,
        },
        where: {
          id: Number(id),
        },
      });

      return res.json({
        status: 200,
        message: "Profile updated successfully!",
      });
    } catch (error) {
      // console.log("The error is", error);
      return res
        .status(500)
        .json({ error: "Something went wrong, please try again." });
    }
  }

  static async destroy() {}
}

export default profileController;
