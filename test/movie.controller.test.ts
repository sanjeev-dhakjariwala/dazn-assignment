import request from 'supertest';
import app from '../server/app';
import mongoose from 'mongoose';
import Movie from '../database/models/Movie';
import * as adminMiddleware from '../middlewares/check.admin';
import { NextFunction } from 'express';

jest.mock('../database/models/Movie');
jest.mock('../middlewares/check.admin');

describe('Movies API', () => {
  (adminMiddleware.admin as jest.Mock).mockImplementation(
    (req: any, res: any, next: any) => next()
  );
  describe('GET /api/movies', () => {
    it('should return an empty array of movies', async () => {
      // Mock the find method to return an empty array
      (Movie.find as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/api/movies');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/movies', () => {
    it('should add a new movie', async () => {
      const movieData = { title: 'Test Movie', genre: 'Test Genre' };
      (Movie.find as jest.Mock).mockResolvedValue([]);
      const response = await request(app).post('/api/movies').send(movieData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Movie added successfully'
      );
    });
  });

  describe('PUT api/movies/:id', () => {
    it('should update an existing movie', async () => {
      const movie = new Movie({
        _id: 123,
        title: 'Existing Movie',
        genre: 'Existing Genre'
      });
      (Movie.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id: 123,
        title: 'Existing Movie',
        genre: 'Existing Genre'
      });

      const updatedMovieData = { genre: 'Updated Genre' };
      const response = await request(app)
        .put(`/api/movies/:id`)
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk5ODk1MjAsImV4cCI6MTcxMjU4MTUyMH0.34Ho8ED-Q9zrivBz6YLGO6JLHrEPKqyVDgkVyy-keaE'
        ])
        .send(updatedMovieData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Movie updated successfully'
      );
    });
  });

  describe('DELETE api/movies/:id', () => {
    it('should delete an existing movie', async () => {
      const movie = new Movie({
        _id: 123,
        title: 'Movie to Delete',
        genre: 'Genre to Delete'
      });
      (Movie.findByIdAndDelete as jest.Mock).mockResolvedValue({
        _id: 123,
        title: 'Existing Movie',
        genre: 'Existing Genre'
      });

      const response = await request(app)
        .delete(`/api/movies/:id`)
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk5ODk1MjAsImV4cCI6MTcxMjU4MTUyMH0.34Ho8ED-Q9zrivBz6YLGO6JLHrEPKqyVDgkVyy-keaE'
        ]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Movie Deleted Successfully!!!'
      );
    });
  });
  describe('GET /api/search', () => {
    it('should return movies matching the search query', async () => {
      // Mock the Movie.find method to return mock data
      (Movie.find as jest.Mock).mockResolvedValue([
        { title: 'Test Movie 1', genre: 'Action' },
        { title: 'Test Movie 2', genre: 'Comedy' }
      ]);

      const searchQuery = 'Test';
      const response = await request(app)
        .get('/api/search')
        .query({ q: searchQuery });

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { title: 'Test Movie 1', genre: 'Action' },
        { title: 'Test Movie 2', genre: 'Comedy' }
      ]);
    });

    it('should return message when no movies found', async () => {
      // Mock the Movie.find method to return an empty array
      (Movie.find as jest.Mock).mockResolvedValue([]);

      const searchQuery = 'NonExistentMovie';
      const response = await request(app)
        .get('/api/search')
        .query({ q: searchQuery });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'No movies found !!!'
      });
    });
  });
});
