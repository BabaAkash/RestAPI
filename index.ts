require('dotenv').config()
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './route/user';
import randomJokeRoute from './route/randomJoke';
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use('/api',userRoute);
app.use('/api',randomJokeRoute);
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/assignment');
  console.log("database connected");
}

main().catch(err => console.log(err));

app.listen(4000, () => {
  console.log("server is running");
});