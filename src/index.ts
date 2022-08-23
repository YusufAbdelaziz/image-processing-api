import express from 'express';
import { mainRouter } from './routes';

const app = express();

const port = 3000;

app.use('/api', mainRouter);

app.listen(port, () => console.log('listening on http://localhost:3000'));
