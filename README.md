# API for a movie lobby for OTT applications

> Node.js movie lobby application built using Express.js and Typescript.

This project is part of assignment given by DAZN

<!-- toc -->

- [Features](#features)
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Install Dependencies](#install-dependencies-frontend--backend)
  - [Run](#run)
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

### Install Dependencies (frontend & backend)

```
npm install
```

### Run

```
# Run Locally
npm run dev

```
