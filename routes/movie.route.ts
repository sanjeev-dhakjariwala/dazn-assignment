import express from 'express';

const router = express.Router();

router.route('/movies').get().post();
router.route('/search').get();
router.route('/movies/:id').put().patch()

export default router;
