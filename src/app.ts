import express from 'express';
import cors from "cors";
import { routes } from './constants';
import { blogsRouter } from './features/blogs';
import { postsRouter } from './features/posts';
import { testDataRouter } from './features/testingDataRouter';

export const app = express()

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).json({version: '1.0'});
});


app.use(routes.BLOGS, blogsRouter);
app.use(routes.POSTS, postsRouter);
app.use(routes.TESTING, testDataRouter);