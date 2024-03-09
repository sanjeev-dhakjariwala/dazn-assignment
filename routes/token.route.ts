import express from 'express';
import { getToken } from '../controllers/token.controller';

const router = express.Router();

router.route('/').post(getToken);

export default router;
