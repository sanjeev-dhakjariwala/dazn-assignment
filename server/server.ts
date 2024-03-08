import app from './app';
import dotenv from'dotenv';
import connectToDB from '../database/models';

dotenv.config();
connectToDB()

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Started started on PORT ${PORT}`);
});
