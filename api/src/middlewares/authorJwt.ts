import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import path from "path";
import fs from "fs";

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../../public_key.pem"),
  "utf8"
);

interface CustomRequest extends Request {
  user?: { id: string; role: string };
}

async function authorJwt(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const sessionCookie = req.session?.jwt;
  const persistentCookie = req.cookies?.persistent;
  try {
    if (!sessionCookie && !persistentCookie) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource." });
    }

    if (!sessionCookie && persistentCookie) {
      (req as Request).session!.jwt = persistentCookie;
    }

    const tokenToVerify = sessionCookie || persistentCookie;
    verify(
      tokenToVerify,
      publicKey,
      { algorithms: ["RS256"] },
      (err, resAuthor: any) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = { id: resAuthor.id, role: resAuthor.role };
        next();
      }
    );
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, please login again." });
  }
}

export { authorJwt };
