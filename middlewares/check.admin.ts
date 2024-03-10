import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.jwt) {
    res.status(401).json({ error: 'Not authorized, no token' });
    return;
  }

  const token = req.cookies.jwt;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      role: string;
    };
    if (decoded.role === 'admin') {
      next();
    } else {
      throw new Error('You are not an admin!!!');
    }
  } catch (err:any) {
    console.error(err.message);
    res.status(401).json({ error: err.message });
  }
};

export { admin };
