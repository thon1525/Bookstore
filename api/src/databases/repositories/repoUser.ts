import { ConnetOricle } from "..";
import oracledb from "oracledb";
import { AuthOracle, AuthType } from "../../@types/AuthType";
export class RepoUser {
  public async GetAll() {
    try {
      const connection = await ConnetOricle();
      const result = await connection.execute<oracledb.Results<AuthOracle>>(
        ` SELECT  USERNAME , EMAIL  FROM  AUTH_TBL `,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return result.rows;
    } catch (error) {
      console.error("user", error);
    }
  }
}
