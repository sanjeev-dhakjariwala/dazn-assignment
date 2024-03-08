import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  genre: string;
  rating: number;
  streamingLink: string;
}

const MovieSchema: Schema = new Schema({
  genre: { type: String, required: true },
  rating: {
    type: Number,
    required: true
  },
  streamingLink: {
    type: String,
    required: true
  }
});

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie