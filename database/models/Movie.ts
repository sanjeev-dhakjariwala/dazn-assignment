import { timeStamp } from 'console';
import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const MovieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    streamingLink: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;
