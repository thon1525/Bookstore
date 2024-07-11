import express, { Request, Response } from "express";
import { ControllerAuth } from "../../controllers/auth.controller";
import StatusCode from "../../utils/httpStatusCode";

const routeAuth = express.Router();

routeAuth.post("/v1/create", async (req: Request, res: Response) => {
  const authObject = new ControllerAuth();
  try {
    const reqAuth = req.body;
    console.log(reqAuth);
    const newUser = await authObject.CreateAuth(reqAuth);
    res.status(StatusCode.CREATED).json(newUser);
  } catch (error) {}
});

export default routeAuth;
