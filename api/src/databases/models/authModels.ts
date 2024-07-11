import { ConnetOricle } from "..";
import { AuthType } from "../../@types/AuthType";
import oracledb from "oracledb";

interface UserOutBinds {
  id: number[];
}

class Users {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: "AUTHOR" | "USER";

  constructor({ id, username, email, password, role }: AuthType) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static async createTable() {
    const connection = await ConnetOricle();
    const sql = `
      CREATE TABLE users_bookstore (
        id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY,
        username VARCHAR2(50) NOT NULL,
        email VARCHAR2(50) NOT NULL,
        password VARCHAR2(100) NOT NULL,
        role VARCHAR2(20) NOT NULL,
        PRIMARY KEY (id)
      )
    `;
    await connection.execute(sql);
    await connection.close();
  }

  static async create({ username, email, password, role }: AuthType) {
    const connection = await ConnetOricle();
    const sql = `
      INSERT INTO users_bookstore (username, email, password, role)
      VALUES (:username, :email, :password, :role)
    `;
    const binds = {
      username,
      email,
      password,
      role,
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const result = await connection.execute(sql, binds, { autoCommit: true });
    const idUser = result.outBinds;

    const newUser = new Users({
      username,
      email,
      password,
      role,
    });

    await connection.close();
    return newUser;
  }
}

export { Users };