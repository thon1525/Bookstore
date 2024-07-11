import express, { Request, Response } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { ClientRequest, IncomingMessage } from "http";
import StatusCode from "../utils/httpStatusCode";
import { OptionCookie } from "../utils/cookieOption";

interface ProxyConfig {
  [context: string]: Options<IncomingMessage, Response>;
}

declare module "express" {
  interface Request {
    session?: any; // Adjust the type based on your session configuration
  }
}

interface NetworkError extends Error {
  code?: string;
}

const proxyConfigs: ProxyConfig = {
  "/api": {
    target: "http://localhost:3000",
    changeOrigin: true,
    selfHandleResponse: true,
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        const expressReq = req as Request;
        const session = expressReq.session?.jwt;
        const persistent = expressReq.cookies?.persistent;
        if (session) {
          proxyReq.setHeader("Authorization", `Bearer ${session}`);
          console.log("Session JWT:", session);
        } else if (persistent) {
          proxyReq.setHeader("Authorization", `Bearer ${persistent}`);
        }
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", (chunk: Buffer) => originalBody.push(chunk));
        proxyRes.on("end", () => {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          try {
            const responseBody = JSON.parse(bodyString);
            const expressReq = req as Request;
            const session = expressReq.session?.jwt;
            const persistent = expressReq.cookies?.persistent;
            const frontendResponse = { ...responseBody, session, persistent };

            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(frontendResponse);
            }
            if (responseBody.redirectUrl) {
              return res.redirect(responseBody.redirectUrl);
            }
            if (responseBody.token) {
              expressReq.session!.jwt = responseBody.token;
              res.cookie("persistent", responseBody.token, OptionCookie);
              delete responseBody.token;
            }
            res.json(frontendResponse);
          } catch (error) {
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        const statusCode =
          err.code === "ECONNREFUSED"
            ? StatusCode.SERVICE_UNAVAILABLE
            : err.code === "ETIMEDOUT"
            ? StatusCode.GATEWAY_TIMEOUT
            : StatusCode.INTERNAL_SERVER_ERROR;
      },
    },
  },
};

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context) => {
    app.use(context, createProxyMiddleware(proxyConfigs[context]));
  });
};

export default applyProxy;
