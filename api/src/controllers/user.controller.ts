import {
  Body,
  Get,
  Middlewares,
  Route,
  SuccessResponse,
  Tags,
  Request,
} from "tsoa";
import { UserServies } from "../services/userServies";
import StatusCode from "../utils/httpStatusCode";
import { PATH_AUTH } from "../routes/pathAuth";
import { AuthType } from "../@types/AuthType";
import { verifyUser } from "../middlewares/verifyuser";
import { authorJwt } from "../middlewares/authorJwt";
import { Request as ExRequest, Response } from "express";
import { SessionData } from "express-session";

@Route("api/v1/auth")
@Tags("Auth")
export class UserController {
  @Get(PATH_AUTH.getAllUser)
  @Middlewares(authorJwt)
  @SuccessResponse(StatusCode.OK, "Success")
  public async GetAllUser(@Request() req: ExRequest): Promise<any> {
    try {
      const objectusers = new UserServies();
      const dataUser = await objectusers.GetServiesUsers();

      // Extract session and cookies
      // const session = req.session?.jwt;
      // const persistent = req.cookies?.persistent;
      return { dataUser };
    } catch (error: unknown) {
      throw error;
    }
  }
}
