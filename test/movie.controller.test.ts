import { add, getMovies } from '../controllers/movie.controller';
import { Request, Response, NextFunction } from 'express';
import Movie, { IMovie } from '../database/models/Movie';
import request from 'supertest';
import app from '../server/app';
import { doesNotReject } from 'assert';

// Mock the Movie model methods
jest.mock('../database/models/Movie');

describe('API Endpoints', () => {
  //Test GET /api/movies
  describe.only('GET /api/movies', () => {
    it.only('should return all movies', async () => {
      const mockMovies = [{ title: 'Movie 1' }, { title: 'Movie 2' }]; // Example Movie data

      (Movie.findOne as jest.Mock).mockResolvedValue(mockMovies);

      const mockRequest: any = {};
      const mockResponse: any = {
        status: 200,
        mockMovies
      };
      const mockNext: NextFunction = jest.fn();

      await getMovies(mockRequest, mockResponse, mockNext);
      expect(mockResponse.mockMovies).toEqual(mockMovies); // Expect actual movies
      expect(mockResponse.status).toEqual(200);
    });
  });
});
