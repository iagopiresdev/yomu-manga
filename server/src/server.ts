import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import router from './routes/routes';
import  userRoutes  from './routes/userRoutes';
import  mangaRoutes  from './routes/mangaRoutes';
import  mangaApiRoutes  from './routes/mangaApiRoutes';
import aiAssistantRoutes  from './routes/openAiRoutes';
import  userMangasRoutes  from './routes/userMangaRoutes';

import { ZodError } from 'zod';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: `${process.env.CLIENT_URL}`,
  credentials: true
}));
//app.use(cookieParser());

app.use('/', router);
app.use('/users', userRoutes);
app.use('/mangas', mangaRoutes);
app.use('/api/mangas', mangaApiRoutes);
app.use('/api/aiAssistant', aiAssistantRoutes);
app.use('/userMangas', userMangasRoutes);

// handle errors with zod
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return response.status(400).json({
      errors: err.errors,
    });
  }
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
