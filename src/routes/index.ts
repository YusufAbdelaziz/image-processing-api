import express from 'express';
import { editImageRoute } from './endpoints/editImage';

const mainRouter = express.Router();

mainRouter.use(editImageRoute);

mainRouter.get('/', (req, res) => {
  res.status(200).send('kindly navigate to /api/editImage');
  res.end();
});

export { mainRouter };
