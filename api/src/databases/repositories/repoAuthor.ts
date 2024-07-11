import { ConnetOricle } from "..";
import { AuthBookType, AuthorJwtType, AuthorType } from "../../@types/AuthType";
import oracledb from "oracledb";
export class repoAuthor {
  public async InsertData(data: AuthorType) {
    const connection = await ConnetOricle();
    try {
      const {
        username,
        email,
        password,
        role = "AUTHOR",
        firstname,
        lastname,
        date_birth,
        nationality,
        bio,
        picture,
      } = data;
      const id = { type: oracledb.NUMBER, dir: oracledb.BIND_OUT };
      const pictureBuffer = picture ? Buffer.from(picture) : null;
      const result = await connection.execute(
        `
        INSERT INTO AUTHOR_TBL (
          USERNAME, EMAIL, PASSWORD, ROLE, FIRSTNAME, LASTNAME, DATE_BIRTH,
          NATIONALITY, BIO, PICTURE
        ) VALUES (
          :username, :email, :password, :role, :firstname, :lastname, :date_birth,
          :nationality, :bio, :picture
        ) RETURNING ID INTO :id
      `,
        {
          username,
          email,
          password,
          role,
          firstname,
          lastname,
          date_birth: new Date(date_birth), // Ensure the date is in the correct format
          nationality,
          bio,
          picture: pictureBuffer,
          id,
        },
        { autoCommit: true }
      );

      const dataAuthors = {
        id: result.outBinds,
        username,
        email,
        password,
        role,
        firstname,
        lastname,
        date_birth,
        nationality,
        bio,
        picture,
      };

      return dataAuthors;
    } catch (error) {
      console.error("error", error);
    }
  }
  // finde email
  public async FindAuthoryEmail(email: string) {
    try {
      const connection = await ConnetOricle();
      const result = await connection.execute(
        `SELECT * FROM AUTHOR_TBL WHERE email = :email`,
        {
          email,
        },
        { autoCommit: true }
      );
      const LikeEmail: any = result.rows;
      return LikeEmail.length > 0 ? LikeEmail[0] : null;
    } catch (error) {
      console.error("error", error);
    }
  }

  public async InsertBookData(dataBook: AuthBookType) {
    const connection = await ConnetOricle();
    const {
      title,
      publication_date,
      description,
      cover_image,
      price,
      category_name,
    } = dataBook;
    const id = { type: oracledb.NUMBER, dir: oracledb.BIND_OUT };
    const picture_cover = cover_image ? Buffer.from(cover_image) : null;
    const result = await connection.execute(
      `
    INSERT INTO AUTHOR_BOOK_TBL (
      TITLE, PUBLICATION_DATE, DESCRIPTION, COVER_IMAGE, PRICE,CATEGORY_NAME
    ) VALUES (
      :title, :publication_date, :description, :cover_image, :price , :category_name
    ) RETURNING ID INTO :id
  `,
      {
        title,
        publication_date,
        description,
        cover_image: picture_cover,
        price,
        id,
        category_name: category_name,
      },
      { autoCommit: true }
    );
    const dataAuthorsBook = {
      id: result.outBinds,
      title,
      publication_date,
      description,
      cover_image,
      price,
      category_name,
    };

    return dataAuthorsBook;
  }
  public async AddBookAuthor(book_id: number, author: AuthorJwtType) {
    try {
      const connection = await ConnetOricle();
      const { author_id, author_role } = author;
      console.log(book_id);
      const result = await connection.execute(
        `
        UPDATE AUTHOR_TBL
        SET BOOK_ID = :book_id
        WHERE ID = :author_id   AND ROLE = :author_role
      `,
        {
          book_id: book_id,
          author_id: author_id,
          author_role: author_role,
        },
        { autoCommit: true }
      );
      console.log("sdfsdf");
    } catch (error: unknown) {
      console.error("error ", error);
    }
  }
}
