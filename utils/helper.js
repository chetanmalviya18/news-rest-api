import { supportedMimes } from "../config/fileSystem.js";
import { v4 as uuidv4 } from "uuid";

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
