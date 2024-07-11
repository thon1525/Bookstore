import { app } from "./app";
import oracledb from "oracledb";
import { ConnetOricle } from "./databases";
const port = 3000;

async function run() {
  try {
    ConnetOricle();
    console.log("Successfully connected to Oracle Database");

    // Pass the Oracle connection to the app instance
    app.set("oracleConnection", ConnetOricle);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Initial Oracle Database connection error", err);
  }
}

run();
