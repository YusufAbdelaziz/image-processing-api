import fs from "fs-extra";
import path from "path";
import { ImageInfo } from "../types/imageInfo";

type RawImage = {
  rawImageExist: boolean;
  rawImage: Buffer | null;
};
/**
 * @description Checks if a modified image exists. The name of the image should follow the pattern imageName-(Height)x(Width).
 *  Used mainly for caching.
 * @param {ImageInfo} imageInfo - the info of the previously modified image.
 * @returns {Buffer} returns the exiting modified image (in case it exists).
 */
async function getExitingModifiedImageByPath(imageInfo: ImageInfo): Promise<Buffer> {
  try {
    // Creates /thumbnails folder in case it doesn't exist.
    await fs.ensureDir(path.join(__dirname, "../../thumbnails/"));
    // Fetches the cached modified image (which has the same height and width of the given image info).
    const image = await fs.readFile(
      path.join(
        __dirname,
        "../../thumbnails/",
        path.parse(`${imageInfo.name}-${imageInfo.width}x${imageInfo.height}`).name + ".jpg"
      )
    );
    return image;
  } catch (e: unknown) {
    throw "Modified Img don't exist";
  }
}

/**
 * @description Checks whether the unmodified/raw image exists at /image directory.
 * @param {string} imageName - The path of the image.
 * @returns {RawImage} returns an object that specify if the raw image exists and if it does, then return it with the
 * object.
 */
async function rawImageExistenceCheck(imageName: string): Promise<RawImage> {
  try {
    const image = await fs.readFile(path.join(__dirname, "../../images", path.parse(imageName).name + ".jpg"));
    return { rawImageExist: true, rawImage: image };
  } catch (e) {
    return { rawImageExist: false, rawImage: null };
  }
}

export { getExitingModifiedImageByPath, rawImageExistenceCheck, RawImage };
