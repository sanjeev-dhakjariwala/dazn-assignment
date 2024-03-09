import express, { Express } from 'express';
import helmet from 'helmet';
import { notFound, errorHandler } from '../middlewares/error.handler';
import movieRoute from '../routes/movie.route';
import tokenRoute from '../routes/token.route';
import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(express.json({ limit: '50mb' }));
app.use(helmet());
app.use(cookieParser());

app.use('/api', movieRoute);
app.use('/api/token', tokenRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server started successfully!!!'
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
