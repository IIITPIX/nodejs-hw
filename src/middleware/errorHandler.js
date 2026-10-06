import { isHttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.status).json({ error: error.message });
  }

  const isProduction = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProduction
      ? 'Something went wrong. Please try again later.'
      : error.message,
  });
};
