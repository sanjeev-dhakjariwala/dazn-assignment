import {
  getMovies,
  searchMovies,
  addMovies,
  updateMovies,
  deleteMovie
} from '../controllers/movie.controller';
import { Request, Response, NextFunction } from 'express';
import Movie, { IMovie } from '../database/models/Movie';
import request from 'supertest';
import app from '../server/app';

// Mock the Movie model methods
jest.mock('../database/models/Movie', () => ({
  find: jest.fn()
}));
let req: Partial<Request>;
let res: Partial<Response>;
let next: Partial<NextFunction>;

const mockedMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
describe('API Endpoints', () => {
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  // Test GET /api/movies
  describe('GET /api/movies', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return all movies', async () => {
      (Movie.find as jest.Mock).mockResolvedValueOnce(mockedMovies);

      await getMovies(req as Request, res as Response, next as NextFunction);

      expect(Movie.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200); // Success for getting all movies
      expect(res.json).toHaveBeenCalledWith(mockedMovies);
    });
  });
  // Test GET /api/movies?q={query}
  describe('GET /api/movies?q={query}', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return matching movies for search query', async () => {
      req = {
        query: { q: 'action' }
      };
      (Movie.find as jest.Mock).mockResolvedValueOnce(mockedMovies);

      await searchMovies(req as Request, res as Response, next as NextFunction);

      expect(Movie.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200); // Success for search results (fixed from 201)
      expect(res.json).toHaveBeenCalledWith(mockedMovies);
    });
  });
  describe('POST /api/movies', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it.only('should add a new movie', async () => {
      const req = {
        body: { title: 'New Movie', genre: 'Comedy' }
      };
      const newMovie = { title: 'New Movie', genre: 'Comedy' };

      (Movie.bulkSave as jest.Mock).mockResolvedValueOnce(newMovie);
      // const movieSaveMock = jest.fn().mockResolvedValueOnce(newMovie);
      // jest.spyOn(Movie.prototype, 'save').mockImplementation();

      await addMovies(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(201); // Success for adding a new movie
      expect(res.json).toHaveBeenCalledWith({
        message: 'Movie added successfully',
        movie: newMovie
      });
    });

    it('should return error for invalid request data', async () => {
      const req = {
        body: { invalidKey: 'Invalid Value' }
      };

      await addMovies(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(400); // Bad request
    });
  });
  // Test PUT /api/movies/:id
  describe('PUT /api/movies/:id', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update an existing movie', async () => {
      const req = {
        params: { id: '1234567890' },
        body: { title: 'Updated Movie' }
      };
      const updatedMovie = {
        _id: '1234567890',
        title: 'Updated Movie',
        genre: 'Drama'
      };

      const findByIdAndUpdateMock = jest
        .fn()
        .mockResolvedValueOnce(updatedMovie);
      jest
        .spyOn(Movie, 'findByIdAndUpdate')
        .mockImplementation(findByIdAndUpdateMock);

      await updateMovies(req as Request, res as Response, next as NextFunction);

      expect(findByIdAndUpdateMock).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Movie updated successfully',
        updatedMovie
      });
    });

    it('should return error if movie not found', async () => {
      const req = {
        params: { id: '1234567890' },
        body: { title: 'Updated Movie' }
      };

      const findByIdAndUpdateMock = jest.fn().mockResolvedValueOnce(null);
      jest
        .spyOn(Movie, 'findByIdAndUpdate')
        .mockImplementation(findByIdAndUpdateMock);

      await updateMovies(req as Request, res as Response, next as NextFunction);

      expect(findByIdAndUpdateMock).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404); // Not found
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
    });

    it('should return error for invalid request data', async () => {
      const req = {
        params: { id: '1234567890' },
        body: { invalidKey: 'Invalid Value' }
      };

      await updateMovies(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(400); // Bad request
    });
  });
  //Test DELETE /api/movies/:id
  describe('DELETE /api/movies/:id', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should delete an existing movie', async () => {
      const req = {
        params: { id: '1234567890' }
      };
      const deletedMovie = {
        _id: '1234567890',
        title: 'Deleted Movie',
        genre: 'Thriller'
      };

      const findByIdAndDeleteMock = jest
        .fn()
        .mockResolvedValueOnce(deletedMovie);
      jest
        .spyOn(Movie, 'findByIdAndDelete')
        .mockImplementation(findByIdAndDeleteMock);

      await deleteMovie(req as Request, res as Response, next as NextFunction);

      expect(findByIdAndDeleteMock).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Movie Deleted Successfully!!!',
        deletedMovie
      });
    });

    it('should return error if movie not found', async () => {
      const req = {
        params: { id: '1234567890' }
      };

      const findByIdAndDeleteMock = jest.fn().mockResolvedValueOnce(null);
      jest
        .spyOn(Movie, 'findByIdAndDelete')
        .mockImplementation(findByIdAndDeleteMock);

      await deleteMovie(req as Request, res as Response, next as NextFunction);

      expect(findByIdAndDeleteMock).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404); // Not found
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
    });
  });
});


