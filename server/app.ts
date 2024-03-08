import express, { Express } from 'express';
import helmet from 'helmet';
import { notFound, errorHandler } from '../middlewares/error.handler';
import movieRoute from '../routes/movie.route';

const app: Express = express();

app.use(express.json({ limit: '50mb' }));
app.use(helmet());

app.use('/api', movieRoute);
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server started successfully!!!'
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
