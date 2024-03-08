import express from 'express';
import {
  addMovies,
  getMovies,
  searchMovies,
  deleteMovie,
  updateMovies
} from '../controllers/movie.controller';
const router = express.Router();

router.route('/movies').get(getMovies).post(addMovies);
router.route('/search').get(searchMovies);
router.route('/movies/:id').put(updateMovies).delete(deleteMovie);

export default router;
