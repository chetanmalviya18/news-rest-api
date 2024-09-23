import { supportedMimes } from "../config/fileSystem.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export const imageValidator = (size, mime) => {
  if (bytesToMB(size) > 2) {
    return "Image size must be less than 2 MB";
  } else if (!supportedMimes.includes(mime)) {
    return "Image must be type of png, jpg, jpeg, svg, webp, gif";
  }

  return null;
};

export const bytesToMB = (bytes) => {
  return bytes / (1024 * 1024);
};

export const generateUniqueID = () => {
  return uuidv4();
};

export const getImageUrl = (imgName) => {
  return `${process.env.APP_URL}/images/${imgName}`;
};

export const removeImage = (imageName) => {
  const path = process.cwd() + "/public/images" + imageName;

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

export const uploadImage = (image) => {
  const imgExt = image?.name.split(".");
  const imgName = generateUniqueID() + "." + imgExt[1];
  const uploadPath = process.cwd() + "/public/images/" + imgName;

  image.mv(uploadPath, (err) => {
    if (err) throw err;
  });

  return imgName;
};
