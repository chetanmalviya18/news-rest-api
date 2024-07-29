import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello it's News API" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
