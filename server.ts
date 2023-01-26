import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { notFound, errorHandler } from "./middleware/error";
import routes from "./routes";
dotenv.config();
const app: Express = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.use(express.json());

///Routes

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/api", routes);

// Use Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
