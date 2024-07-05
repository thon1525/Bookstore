import express, { Request, Response } from "express";
import routeProduct from "./routes/v1/route";
import routeAuth from "./routes/v1/auth";
export const app = express();

app.get("/", (req: Request, Res: Response) => {
  Res.send("hell thon welcome data");
});

app.use("/product", routeProduct);

app.use("/", routeAuth);
