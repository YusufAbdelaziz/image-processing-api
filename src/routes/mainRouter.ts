import express from "express";
import { editImageRoute } from "./endpoints/editImage";

const mainRouter = express.Router();

mainRouter.use(editImageRoute);

mainRouter.get("/", (_, res) => {
  res.status(200).send("kindly navigate to /api/editImage").end();
});

export { mainRouter };
