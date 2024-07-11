import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Tags,
  Request,
  Middlewares,
  Get,
} from "tsoa";
import { PATH_AUTH } from "../routes/pathAuth";
import StatusCode from "../utils/httpStatusCode";
import { AuthServer } from "../services/authServer";
import {
  AuthBookType,
  AuthorJwtType,
  AuthorType,
  AuthType,
} from "../@types/AuthType";
import { Request as ExRequest, Response } from "express";
import { authorServer } from "../services/authorServer";
import { authorJwt } from "../middlewares/authorJwt";
import { bookstoreServies } from "../services/bookstoreServies";
import { verifyUser } from "../middlewares/verifyuser";

@Route("/api/v1/auth")
@Tags("Auth")
export class ControllerAuth extends Controller {
  @Post(PATH_AUTH.signUp)
  @SuccessResponse(StatusCode.CREATED, "Created")
  public async CreateAuth(
    @Body() reqBody: AuthType,
    @Request() req: ExRequest
  ): Promise<any> {
    try {
      const serverObject = new AuthServer();
      const authData = await serverObject.CreateData(reqBody);

      // Store JWT in session and cookie
      if (authData) {
        req.session!.jwt = authData;
        (req as any).res.cookie("persistent", authData, {
          httpOnly: true,
          secure: true,
        });
      }
      return authData;
    } catch (error) {
      throw error;
    }
  }
  @Post(PATH_AUTH.becomeAuthor)
  @SuccessResponse(StatusCode.CREATED, "Created")
  public async CreateAuthor(
    @Body() reqBody: AuthorType,
    @Request() req: ExRequest
  ): Promise<any> {
    try {
      const serviceAuthor = new authorServer();
      const authorData = await serviceAuthor.InsertAuthor(reqBody);
      // Store JWT in session and cookie
      if (authorData) {
        req.session!.jwt = authorData;
        (req as any).res.cookie("persistent", authorData, {
          httpOnly: true,
          secure: true,
        });
      }
      return authorData;
    } catch (error: unknown) {
      throw error;
    }
  }

  @Post(PATH_AUTH.uploadBook)
  @Middlewares(authorJwt)
  @SuccessResponse(StatusCode.CREATED, "Created")
  public async UploadBook(
    @Body() reqBody: AuthBookType,
    @Request() req: ExRequest
  ): Promise<any> {
    try {
      const serviceAuthor = new authorServer();
      //  const userId = (req as any).user.role;
      const author_id = (req as any).user!.id; // Extract the user ID from the JWT
      const author_role = (req as any).user!.role;
      const author: AuthorJwtType = { author_id, author_role };

      ///  const author: number = authorId;
      const bookData = await serviceAuthor.InsertBook(reqBody, author);

      return bookData;
    } catch (error: unknown) {
      throw error;
    }
  }

  // book use for user an not user can seen

  // book for selling user has app
  @Get(PATH_AUTH.viewBook)
  @Middlewares(authorJwt)
  @SuccessResponse(StatusCode.OK, "Created")
  public async ViewBook() {
    try {
      const objectbookstoreServies = new bookstoreServies();
      const dataBookstores = await objectbookstoreServies.BookstoreGetView();
      return dataBookstores;
    } catch (error: unknown) {
      throw error;
    }
  }
}
