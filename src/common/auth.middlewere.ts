import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request as ExpressRequest,Response,NextFunction } from 'express';
export interface Request extends ExpressRequest{
  email : string
}
@Injectable()
export class Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
 
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${req.ip}`,
    );
    next();
  }
}
