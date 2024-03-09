import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
//User must be admin
const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req?.cookies?.jwt) {
    let token;
    token = req?.cookies?.jwt;

    if (token) {
      try {
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET || '');
        if (decoded.role === 'admin') {
          next();
        } else {
          throw new Error('You are not an admin!!!');
        }
      } catch (err: any) {
        console.log(err.message);
        res.status(401);
        throw new Error(err.message);
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } else {
    res.status(401);
    throw new Error(`No Token`);
  }
};

export { admin };
