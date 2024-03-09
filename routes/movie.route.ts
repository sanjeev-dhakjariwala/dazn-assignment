import express from 'express';
import {
  addMovies,
  getMovies,
  searchMovies,
  deleteMovie,
  updateMovies
} from '../controllers/movie.controller';
import { admin } from '../middlewares/check.admin';

const router = express.Router();

router.route('/movies').get(getMovies).post(addMovies);
router.route('/search').get(searchMovies);
router.route('/movies/:id').put(admin, updateMovies).delete(admin, deleteMovie);

export default router;
