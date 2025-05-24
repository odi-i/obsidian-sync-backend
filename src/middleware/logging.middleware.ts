import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, originalUrl, body, query, params } = req;

  console.log('--- Request Log ---');
  console.log(`[${new Date().toISOString()}] ${method} ${originalUrl}`);
  console.log('Query:', query);
  console.log('Params:', params);
  console.log('Body:', body);
  console.log('-------------------');

  next();
}
