import { rawImageExistenceCheck, getExitingModifiedImageByPath } from "./files";
import express from "express";
import { ImageInfo } from "../types/imageInfo";
import sharp from "sharp";
import path from "path";

async function resizeImageMiddleware(req: express.Request, res: express.Response): Promise<void> {
  const imageInfo = extractParams(req);
  // Check if the raw image that was provided exists at /images directory.
  const { rawImageExist, rawImage } = await rawImageExistenceCheck(imageInfo.name);
  if (rawImageExist && rawImage != null) {
    try {
      /// If it exists, check if a modified image with given height and width was already created at
      /// /thumbnails directory
      const modifiedImage = await getExitingModifiedImageByPath(imageInfo);
      res.writeHead(200, { "Content-Type": "image/jpg" });
      res.end(modifiedImage);
    } catch (e) {
      /// If the modified image doesn't exist, then use "sharp" to resize the image.
      await resizeImage(imageInfo, rawImage);
      const modifiedImage = await getExitingModifiedImageByPath(imageInfo);
      res.writeHead(200, { "Content-Type": "image/jpg" });
      res.end(modifiedImage);
    }
  } else {
    /// In case the the raw image in /images folder doesn't exist.
    res.send("Kindly add the image you want to resize into /images folder and try again");
    res.status(400);
    res.end();
  }
}

/**
 * @description Extracts the query params from the request.
 * @param {express.Request} req - the request that has the query params.
 * @returns {ImageInfo} returns the image information (width, height, file).
 */
function extractParams(req: express.Request): ImageInfo {
  const imageInfo: ImageInfo = {
    name: req.query["fileName"] as string,
    width: Number.parseFloat(req.query["width"] as string),
    height: Number.parseFloat(req.query["height"] as string)
  };
  return imageInfo;
}

/**
 * @description Resizes an image given its resize requirements as well as saving the new image to /thumbnails folder.
 * @param {ImageInfo} imageInfo - Information associated with the image.
 * @param {Buffer} image - The image file
 */
async function resizeImage(imageInfo: ImageInfo, image: Buffer): Promise<void> {
  await sharp(image)
    .resize(imageInfo.width, imageInfo.height)
    .toFile(
      path.join(
        __dirname,
        "../../thumbnails/",
        path.parse(`${imageInfo.name}-${imageInfo.width}x${imageInfo.height}`).name + ".jpg"
      )
    );
}

export { resizeImage, resizeImageMiddleware };
