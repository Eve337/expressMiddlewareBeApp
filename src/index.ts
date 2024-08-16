import express from 'express';
import cors from "cors";

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
// app.use(routes.POSTS, postsRouter);