import { getMovies, searchMovies } from '../controllers/movie.controller';
import { Request, Response, NextFunction } from 'express';
import Movie, { IMovie } from '../database/models/Movie';
import request from 'supertest';
import app from '../server/app';

// Mock the Movie model methods
jest.mock('../database/models/Movie', () => ({
  find: jest.fn()
}));

describe('API Endpoints', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  const mockedMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  //Test GET /api/movies
  describe('GET /api/movies', () => {
    afterEach;
    () => {
      jest.clearAllMocks();
    };
    it('should return all movies', async () => {
      (Movie.find as jest.Mock).mockResolvedValueOnce(mockedMovies);

      await getMovies(req as Request, res as Response, next as NextFunction);

      expect(Movie.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockedMovies);
    });

    it.only('should return all matching movies', async () => {
      (Movie.find as jest.Mock).mockResolvedValueOnce(mockedMovies);
      req = {
        query: { q: 'action' }
      };
      await searchMovies(req as Request, res as Response, next as NextFunction);

      expect(Movie.find).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockedMovies);
    });
  });
});
