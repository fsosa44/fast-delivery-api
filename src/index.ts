import express, { NextFunction, Request, Response } from "express";
require("dotenv").config(); // eslint-disable-line no-alert
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import routes from "./routes/index.routes";
import db from "./config/db.config";
import { createAdminUser } from "./utils/index.utils";

// swagger
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const port = process.env.PORT || 4000;
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fast-Delivery",
      version: "1.0.0'",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.ts")}`],
};

const app = express();
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): express.Response => {
    return res.status(500).send(err);
  }
);
app.use("/api", routes);

if (require.main === module) {
  db.sync({ force: false })
    .then(async () => {
      return await createAdminUser();
    })
    .then(() => {
      app.listen(port, () => console.log(`Servidor en el puerto ${port}`));
    })
    .catch(console.error);
}

export default app;
