import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async.handler';
import { generateToken } from '../utils/generate.jwt';

const getToken = asyncHandler(async (req: Request, res: Response) => {
  const user = req.body;
  try {
    generateToken(res, user);
    res.status(201).send({
      success: 'Token generated successfully!!!'
    });
  } catch (err: any) {
    res.status(500).send({
      success: 'Token not generated!!!'
    });
  }
});

export { getToken };
