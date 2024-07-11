import express, { Application, Request, Response, NextFunction } from "express";
import routeAuth from "./routes/v1/auth";
import { RegisterRoutes } from "./routes/v1/routes";
import { PATH_AUTH } from "./routes/pathAuth";
import swaggerUi from "swagger-ui-express";
import cookieSession from "cookie-session";
import swaggerDocument from "../public/swagger.json";
import cookieParser from "cookie-parser";
import { verifyUser } from "./middlewares/verifyuser";
import { errorHandler } from "./middlewares/errorsHandler";
import unless from "./middlewares/unlessRoute";
import cors from "cors";
import { OptionSession } from "./utils/cookieOption";
import applyProxy from "./middlewares/proxy";
import StatusCode from "./utils/httpStatusCode";
import redoc from "redoc-express";

export const app: Application = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cookieSession(OptionSession));

const corsOptions = {
  origin: "http://localhost:8000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/protected-route", verifyUser, (req, res) =>
  res.send("You have access!")
);

// API Documentation
app.get(
  "/wiki-docs",
  redoc({
    title: "API Docs",
    specUrl: "/swagger.json",
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: "#6EC5AB",
          },
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: "15px",
          lineHeight: "1.5",
          code: {
            code: "#87E8C7",
            backgroundColor: "#4D4D4E",
          },
        },
        menu: {
          backgroundColor: "#ffffff",
        },
      },
    },
  })
);
// app.use(unless("/v1/auth", verifyUser));
// applyProxy(app);
RegisterRoutes(app);

app.use("*", (req: Request, res: Response, _next: NextFunction) => {
  res
    .status(StatusCode.NOT_FOUND)
    .json({ message: "The endpoint called does not exist." });
});

app.use(errorHandler);
