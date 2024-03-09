import { getMovies } from '../controllers/movie.controller';
import { Request, Response, NextFunction } from 'express';
import Movie, { IMovie } from '../database/models/Movie';
import request from 'supertest';
import app from '../server/app';

// Mock the Movie model methods
jest.mock('../database/models/Movie');

describe('API Endpoints', () => {
  //Test GET /api/movies
  describe('GET /api/movies', () => {
    it('should return all movies', async () => {
      const mockMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }]; // Example Movie data

      (Movie.findOne as jest.Mock).mockResolvedValue(mockMovies[0]); // Mocking findOne to return a single movie object

      const mockRequest: any = {};
      const mockJsonFn = jest.fn(); // Mocking the json function of response object
      const mockResponse: any = {
        status: jest.fn(() => ({ json: mockJsonFn }))
      };
      const mockNext: NextFunction = jest.fn();

      await getMovies(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockJsonFn).toHaveBeenCalledWith(mockMovies[0]); // Expect the JSON data sent in the response
    });
  });
});
