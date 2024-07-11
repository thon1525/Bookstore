import oracledb from "oracledb";
export async function handleBlob(blob: oracledb.Lob): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    blob.on("data", (chunk: Buffer) => chunks.push(chunk));
    blob.on("end", () => resolve(Buffer.concat(chunks)));
    blob.on("error", (err: any) => reject(err));
  });
}

// // Utility function to handle CLOB data
// export async function handleClob(clob: oracledb.Lob): Promise<string> {
//   return new Promise((resolve, reject) => {
//     if (clob && clob.readable) {
//       let clobData = "";
//       clob.setEncoding("utf8");
//       clob.on("data", (chunk: string) => (clobData += chunk));
//       clob.on("end", () => resolve(clobData));
//       clob.on("error", (err: any) => reject(err));
//     } else {
//       resolve(clob.toString()); // This handles non-streamable clob
//     }
//   });
// }

// Utility function to handle CLOB data
export async function handleClob(clob: oracledb.Lob | string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof clob === "string") {
      resolve(clob);
    } else if (clob && clob.readable) {
      let clobData = "";
      clob.setEncoding("utf8");
      clob.on("data", (chunk: string) => (clobData += chunk));
      clob.on("end", () => resolve(clobData));
      clob.on("error", (err: any) => reject(err));
    } else {
      resolve(clob.toString()); // This handles non-streamable clob
    }
  });
}
