import Movie from '../database/models/Movie';
import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async.handler';

/**
 * GET /movies
 * This end points gets all the movies stored
 */

const getMovies = asyncHandler(async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /search?q={query}
 */

const searchMovies = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query.q as string;
  try {
    const result = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } }
      ]
    });
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json({
        message: 'No movies found !!!'
      });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /movies
 */

const addMovies = asyncHandler(async (req: Request, res: Response) => {
  try {
    const movie = new Movie(req.body);
    const result = await Movie.find({
      $or: [{ title: { $regex: movie.title, $options: 'i' } }]
    });
    if (result.length > 0) {
      res.json({
        message: 'Movie already exists!!!'
      });
    } else {
      await movie.save();
      res.status(201).json({ message: 'Movie added successfully', movie });
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * PUT /movies/:id
 */

const updateMovies = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie updated successfully', updatedMovie });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE /movies/:id
 */

const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie Deleted Successfully!!!', deletedMovie });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export { getMovies, searchMovies, addMovies, updateMovies, deleteMovie };
