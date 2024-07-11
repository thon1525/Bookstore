import { ConnetOricle } from "..";
import oracledb from "oracledb";
import { readClob } from "../../utils/readClob";
import { handleBlob, handleClob } from "../../utils/handleBlob";
import { describe } from "node:test";
import { viewBookType } from "../../@types/AuthType";
export class repoBookstore {
  public async GetAllBook() {
    const connection = await ConnetOricle();
    try {
      const result = await connection.execute<oracledb.Results<viewBookType>>(
        `SELECT * FROM AUTHORBOOKVIEW_TBL`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      const data: any = result.rows;
      for (const row of data) {
        row.PICTURE = await handleBlob(row.PICTURE);
        row.BIO = await handleClob(row.BIO);
        row.COVER_IMAGE = await handleBlob(row.COVER_IMAGE);
        row.DESCRIPTION = await handleClob(row.DESCRIPTION);
      }
      return data;
    } catch (error: unknown) {
      console.log(error);
    }
  }
}
