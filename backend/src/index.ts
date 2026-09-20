import express from 'express';
import dotenv from 'dotenv';
import { error_middleware } from './middlewares/error_middleware';
import { UserRouter } from './routes/users';
dotenv.config();


const app = express();
const port: number = (process.env.PORT as unknown as number) || 3000;
const base_url: string = "/elearning/api/";

app.use(express.json());
app.use(base_url + 'user', UserRouter);



app.use((req, res) => {
  res.status(404).json({
    message: "Unknown Endpoint"
  })
})

app.use(error_middleware);


app.listen(port, () => {
  console.log("App is listening on port " + port);
})

