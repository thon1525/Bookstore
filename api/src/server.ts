import { app } from "./app";
import oracledb from "oracledb";
const port = 3000;

// Oracle Database connection details
const oracleConfig = {
  user: "sys",
  password: "thon123",
  connectString: "localhost:1536/XEPDB1",
  privilege: oracledb.SYSDBA, // 'role' changed to 'privilege' as per oracledb documentation
};

async function run() {
  try {
    const connection = await oracledb.getConnection(oracleConfig);
    console.log("Successfully connected to Oracle Database");

    // Pass the Oracle connection to the app instance
    app.set("oracleConnection", connection);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Initial Oracle Database connection error", err);
  }
}

run();
