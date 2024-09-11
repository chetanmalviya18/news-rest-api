import vine, { errors } from "@vinejs/vine";
import { newsSchema } from "../validations/newsValidation.js";
import { generateUniqueID, imageValidator } from "../utils/helper.js";
import prisma from "../DB/db.config.js";
import NewsApiTranform from "../transform/tramsform.js";

class NewsController {
  static async index(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;

    if (page <= 0) page = 1;
    if (limit <= 0 || limit > 100) limit = 10;

    const skip = (page - 1) * limit;

    const news = await prisma.news.findMany({
      take: limit,
      skip: skip,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile: true,
          },
        },
      },
    });
    const newsTransform = news?.map((i) => NewsApiTranform.transform(i));

    const toatlNews = await prisma.news.count();
    const totalPage = Math.ceil(toatlNews / limit);

    return res.json({
      status: 200,
      news: newsTransform,
      metadata: {
        totalPage,
        currentPage: page,
        currentLimit: limit,
      },
    });
  }

  static async store(req, res) {
    try {
      const user = req.user;
      const body = req.body;

      const validator = vine.compile(newsSchema);
      const payload = await validator.validate(body);

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          errors: {
            image: "Image filed is required.",
          },
        });
      }

      const image = req.files.image;
      //Image custom validator
      const message = imageValidator(image?.size, image?.mimetype);

      if (message !== null) {
        return res.status(400).json({
          errors: {
            image: message,
          },
        });
      }

      //Image upload
      const imgExt = image?.name.split(".");
      const imgName = generateUniqueID() + "." + imgExt[1];
      const uploadPath = process.cwd() + "/public/images/" + imgName;

      image.mv(uploadPath, (err) => {
        if (err) throw err;
      });

      payload.image = imgName;
      payload.user_id = user.id;

      const news = await prisma.news.create({
        data: payload,
      });

      return res.json({
        status: 200,
        message: "News created successfully",
        news,
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

  static async show(req, res) {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile: true,
            },
          },
        },
      });

      const transformNews = news ? NewsApiTranform.transform(news) : null;

      return res.json({ status: 200, news: transformNews });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  static async update(req, res) {}
  static async destroy(req, res) {}
}

export default NewsController;
