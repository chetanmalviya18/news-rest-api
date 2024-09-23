import express from "express";
import "dotenv/config";
import ApiRoutes from "./routes/api.js";
import fileupload from "express-fileupload";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./config/rateLimiter.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileupload());
app.use(helmet());
app.use(cors());
app.use(limiter);

app.get("/", (req, res) => {
  return res.json({ message: "Hello it's News API" });
});

//routes
app.use("/api", ApiRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
