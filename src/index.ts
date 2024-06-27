import express from 'express';
import cors from "cors";
import { blogsRouter } from './features/blogs';
import { routes } from './constants';
import { postsRouter } from './features/posts';

export const app = express()
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).json({version: '1.0'})
})

app.listen(PORT, () => {
    console.log('...server started in port ' + PORT)
})


// app.use(routes.BLOGS, blogsRouter);
// app.use(routes.POSTS, postsRouter);