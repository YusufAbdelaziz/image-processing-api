import express from "express";
import { validateQueryParameters, validatorMiddleware } from "../../utils/validator";
import { resizeImageMiddleware } from "../../utils/imageResize";

const editImageRoute = express.Router();

editImageRoute.get("/editImage", ...validateQueryParameters(), validatorMiddleware, resizeImageMiddleware);

export { editImageRoute };
