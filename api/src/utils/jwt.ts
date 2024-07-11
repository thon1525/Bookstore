import path from "path";
import fs from "fs";
const privateKeyPath = path.join(__dirname, "../../private_key.pem");
import jwt from "jsonwebtoken";
// Read the private key from the file
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

export const generateSignature = async ({
  id,
  role,
}: {
  id: string;
  role: string;
}): Promise<string> => {
  const payload = {
    id, // Using shorthand property names
    role,
  };
  try {
    // Sign the JWT token with the private key
    return await jwt.sign(payload, privateKey, {
      expiresIn: "30d",
      algorithm: "RS256",
    });
  } catch (error: unknown) {
    throw error;
  }
};
