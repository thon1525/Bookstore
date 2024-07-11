import oracledb from "oracledb";

export async function readClob(lob: oracledb.Lob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log(lob);
    let clobData = "";
    lob.setEncoding("utf8"); // Set the encoding to utf8

    lob.on("data", (chunk) => {
      clobData += chunk;
    });

    lob.on("end", () => {
      resolve(clobData);
    });

    lob.on("error", (err) => {
      reject(err);
    });
  });
}
