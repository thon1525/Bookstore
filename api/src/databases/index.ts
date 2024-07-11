import oracledb, { Connection } from "oracledb";
const oracleConfig = {
  user: "sys",
  password: "thon123",
  connectString: "localhost:1536/XEPDB1",
  privilege: oracledb.SYSDBA, // 'role' changed to 'privilege' as per oracledb documentation
};

const ConnetOricle = async (): Promise<Connection> => {
  const connection = await oracledb.getConnection(oracleConfig);
  return connection;
};
export { ConnetOricle };
