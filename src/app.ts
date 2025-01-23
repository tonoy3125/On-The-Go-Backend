import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { routes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import NotFound from "./app/errors/notFound";

const app: Application = express();
// const port = 3000

// parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Application Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({
    message: "Wellcome to On The Go Travel Story!!!",
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(globalErrorHandler);

// Not found
app.use(NotFound);

export default app;
