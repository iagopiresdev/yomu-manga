import express from 'express';
import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import { router } from './routes2/routes';
import { ZodError } from 'zod';

const app = express();

app.use(express.json());
app.use(router);

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

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
