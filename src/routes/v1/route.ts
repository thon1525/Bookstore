import express, { Request, Response } from "express";
import { controllerProduct } from "../../controllers/controller.product";

const routeProduct = express.Router();
const Controller = new controllerProduct();
routeProduct.get("/", (req: Request, res: Response) => {
  const dataShow = Controller.GetData;
  return dataShow;
});

routeProduct.post("/", (req: Request, res: Response) => {
  const dataRq = req.body();
  const dataAlready = Controller.CreateData(dataRq);
  return dataAlready;
});
export default routeProduct;
