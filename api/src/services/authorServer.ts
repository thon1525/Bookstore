import { AuthBookType, AuthorJwtType, AuthorType } from "../@types/AuthType";
import { repoAuthor } from "../databases/repositories/repoAuthor";
import { BaseCustomError } from "../error/baseCustomError";
import StatusCode from "../utils/httpStatusCode";
import { generateSignature } from "../utils/jwt";

export class authorServer {
  public async InsertAuthor(dataAuth: AuthorType) {
    try {
      const authorObject = new repoAuthor();
      // finde email for Personal Author
      const { email } = dataAuth;
      const FindeEmail = await authorObject.FindAuthoryEmail(email);
      if (FindeEmail) {
        throw new BaseCustomError(
          "Your account is already signed up. Please log in instead.",
          StatusCode.BAD_REQUEST
        );
      }
      const authorData = await authorObject.InsertData(dataAuth);
      const author: any = authorData?.id;
      const authorid = author.id;
      const role: any = authorData?.role;
      const jwtToken = await generateSignature({
        id: authorid.toString(),
        role: role.toString(),
      });

      return jwtToken;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async InsertBook(data: AuthBookType, authoId: AuthorJwtType) {
    try {
      const authorObject = new repoAuthor();

      // create book
      const dataBook = await authorObject.InsertBookData(data);
      const Bookid: any = dataBook?.id;
      const authorBook = Bookid.id;
      let authorBook_id = 0;
      authorBook.map((item: any) => {
        return (authorBook_id = item);
      });

      // add or update  book to  author
      await authorObject.AddBookAuthor(authorBook_id, authoId);
      return dataBook;
    } catch (error: unknown) {
      throw error;
    }
  }
}
