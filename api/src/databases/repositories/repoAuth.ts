import { ConnetOricle } from "..";
import { AuthType } from "../../@types/AuthType";
import oracledb from "oracledb";
export class RepoAuth {
  public async InsertData(dataAuth: AuthType) {
    const connection = await ConnetOricle();
    try {
      const { username, email, password, role = "USER" } = dataAuth;
      const id = { type: oracledb.NUMBER, dir: oracledb.BIND_OUT };
      const result = await connection.execute(
        `INSERT INTO AUTH_TBL  (username, email, password, role) VALUES (:username, :email, :password, :role) RETURNING id INTO :id`,
        {
          username: username,
          email: email,
          password: password,
          role: role,
          id, // Bind the variable
        },
        { autoCommit: true }
      );

      const message = {
        id: result.outBinds,
        username,
        email,
        password,
        role,
      };

      return message;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
}
