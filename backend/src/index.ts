import express from 'express';
import { error_middleware } from './middlewares/error_middleware';
import { UserRouter } from './routes/users';
import { CourseRouter } from './routes/courses';
import { ModuleRouter } from './routes/modules';
import { RecordRouter } from './routes/records';
import { LessonRouter } from './routes/lessons';
import { jsonReplacer } from './lib/json';


const app = express();
const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}
const base_url = "/elearning/api";

app.use(express.json());
app.set('json replacer', jsonReplacer);
app.use(`${base_url}/user`, UserRouter);
app.use(`${base_url}/courses`, CourseRouter);
app.use(`${base_url}/modules`, ModuleRouter);
app.use(`${base_url}/records`, RecordRouter);
app.use(`${base_url}/lessons`, LessonRouter);


app.use((_req, res) => {
  res.status(404).json({
    message: "Unknown Endpoint"
  })
})

app.use(error_middleware);


app.listen(port, () => {
  console.log("App is listening on port " + port);
})
