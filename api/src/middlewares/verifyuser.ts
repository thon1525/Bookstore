import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import path from "path";
import fs from "fs";

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../../public_key.pem"), // Ensure this path is correct
  "utf8"
);

async function verifyUser(req: Request, res: Response, next: NextFunction) {
  const sessionCookie = req.session?.jwt;
  const persistentCookie = req.cookies?.persistent;

  try {
    if (!sessionCookie && !persistentCookie) {
      // If neither cookie is present, throw an unauthorized error
      return res
        .status(401)
        .json({ message: "Please login to access this resource." });
    }

    // If sessionCookie is not present but persistentCookie is, update sessionCookie
    if (!sessionCookie && persistentCookie) {
      (req as Request).session!.jwt = persistentCookie;
    }

    // Verify either sessionCookie or persistentCookie
    const tokenToVerify = sessionCookie || persistentCookie;
    await verify(tokenToVerify, publicKey, {
      algorithms: ["RS256"],
    });

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, please login again." });
  }
}

export { verifyUser };
