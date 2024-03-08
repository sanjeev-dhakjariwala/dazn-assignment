import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async.handler';
import { generateToken } from '../utils/generate.jwt';

const getToken = asyncHandler(async(req: Request, res: Response) => {

})

export{
    getToken
}