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

  static async update() {}

  static async destroy() {}
}

export default profileController;
