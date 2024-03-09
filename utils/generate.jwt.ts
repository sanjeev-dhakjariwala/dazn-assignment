import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ role: userId.role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d'
  });

  // Set JWT as an HTTP-Only cookie
  if (token) {
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
  }else{
    throw new Error("Not able to generate token")
  }
};

export { generateToken };
