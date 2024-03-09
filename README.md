# API for a movie lobby for OTT applications

> Node.js movie lobby application built using Express.js and Typescript.

This project is part of assignment given by DAZN

<!-- toc -->

- [Features](#features)
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Install Dependencies](#install-dependencies)
  - [Run](#run)
  - [Test](#test)
- [API Documentation](#documentation)
  - [Token Generation](#token-generation)
  - [Get All Movies](#get-all-movies)
  - [Search Movies](#search-movie)
  - [Add new movie](#add-new-movie)
  - [Update existing movie](#update-movie)
  - [Delete movies](#delete-movie)
  <!-- tocstop -->

## Features

- List all the movies in the lobby
- Search for a movie by title or genre
- Add a new movie to the lobby
- Update an existing movie information (title, genre, rating, or streaming link)
- Delete a movie from the lobby

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

I have pushed `.env` intentionally for quick start. Please feel free to use you own MONGO URI

```
PORT = 4000
MONGO_URI = your mongodb uri
```

### Install Dependencies

```
npm install
```

### Run

```
# Run Locally
npm run dev
```

### Test

```
# Run Testcases
npm test
```

## API Documentation

### Token Generation

> As there is role based implementation involved so we have to first get the token to start using the APIs.

`POST /api/token`

> Body

```js
{
    "role": "user"
}
```

> Choose the `role` as `admin` to access the protected endpoints

> Response

```js
{
    "success": "Token generated successfully!!!"
}
```

### Get All Movies

`GET /api/movies`

> Response

```js
[
  {
    _id: '65eb86c8ca3ab1efff411a61',
    title: 'Hangover1 Update 1',
    genre: 'Comedy',
    rating: 4.5,
    streamingLink: 'http://xyz.com',
    createdAt: '2024-03-08T21:44:40.208Z',
    updatedAt: '2024-03-09T02:05:05.597Z',
    __v: 0
  },
  {
    _id: '65eb8755ca3ab1efff411a63',
    title: 'Inception',
    genre: 'Sci-Fi',
    rating: 8.8,
    streamingLink: 'https://example.com/inception',
    createdAt: '2024-03-08T21:47:01.945Z',
    updatedAt: '2024-03-08T21:47:01.945Z',
    __v: 0
  }
];
```

### Search Movie

`GET /api/search/?q="sc"`

> Response

```js
[
  {
    _id: '65eb8755ca3ab1efff411a63',
    title: 'Inception',
    genre: 'Sci-Fi',
    rating: 8.8,
    streamingLink: 'https://example.com/inception',
    createdAt: '2024-03-08T21:47:01.945Z',
    updatedAt: '2024-03-08T21:47:01.945Z',
    __v: 0
  },
  {
    _id: '65eb878fca3ab1efff411a6d',
    title: 'The Matrix',
    genre: 'Sci-Fi',
    rating: 8.7,
    streamingLink: 'https://example.com/the-matrix',
    createdAt: '2024-03-08T21:47:59.325Z',
    updatedAt: '2024-03-08T21:47:59.325Z',
    __v: 0
  },
  {
    _id: '65eb87abca3ab1efff411a71',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    rating: 8.6,
    streamingLink: 'https://example.com/interstellar',
    createdAt: '2024-03-08T21:48:27.583Z',
    updatedAt: '2024-03-08T21:48:27.583Z',
    __v: 0
  },
  {
    _id: '65eb87b9ca3ab1efff411a73',
    title: "Schindler's List",
    genre: 'Drama',
    rating: 8.9,
    streamingLink: 'https://example.com/schindlers-list',
    createdAt: '2024-03-08T21:48:41.125Z',
    updatedAt: '2024-03-08T21:48:41.125Z',
    __v: 0
  }
];
```

### Add new movie

`POST /api/movies`

> Body

```js
{
    "title": "Superbad",
    "genre": "Comedy",
    "rating": 8.9,
    "streamingLink": "https://example.com/lotr-return-of-the-king"
}
```

> Response

```js
{
    "message": "Movie added successfully",
    "movie": {
        "title": "The Lord of the Rings: The Return of the King1",
        "genre": "Fantasy",
        "rating": 8.9,
        "streamingLink": "https://example.com/lotr-return-of-the-king",
        "_id": "65ec1e339868cf5f30d7ba61",
        "createdAt": "2024-03-09T08:30:44.360Z",
        "updatedAt": "2024-03-09T08:30:44.360Z",
        "__v": 0
    }
}
```

### Update Movie

> This is protected route so during the token generation role should be slected as `admin`

`PUT /api/movies/:id`

- Path variable id = 65eb86c8ca3ab1efff411a61

> Body

```js
{
    "title": "Hangover1 Update 1"
}
```

> Response

```js
{
    "message": "Movie updated successfully",
    "updatedMovie": {
        "_id": "65eb86c8ca3ab1efff411a61",
        "title": "Hangover1 Update 1",
        "genre": "Comedy",
        "rating": 4.5,
        "streamingLink": "http://xyz.com",
        "createdAt": "2024-03-08T21:44:40.208Z",
        "updatedAt": "2024-03-09T13:05:24.248Z",
        "__v": 0
    }
}
```

> If the role is `user`

> Response

```js
{
    "message": "You are not an admin!!!"
}
```

### Delete Movie

> This is protected route so during the token generation role should be slected as `admin`

`DELETE /api/movies/:id`

- Path variable id = 65eb86c8ca3ab1efff411a61

> Response

```js
{
    "message": "Movie Deleted Successfully!!!",
    "deletedMovie": {
        "_id": "65eb86c8ca3ab1efff411a61",
        "title": "Hangover1 Update 1",
        "genre": "Comedy",
        "rating": 4.5,
        "streamingLink": "http://xyz.com",
        "createdAt": "2024-03-08T21:44:40.208Z",
        "updatedAt": "2024-03-09T13:05:24.248Z",
        "__v": 0
    }
}
```

> If the role is `user`

> Response

```js
{
    "message": "You are not an admin!!!"
}
```