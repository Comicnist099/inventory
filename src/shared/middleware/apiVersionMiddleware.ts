import type { CustomRequest } from "../../types/express";

import type { Response, NextFunction } from "express";

export const apiVersionMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const version = req.headers["accept-version"] || "v1";
  req.apiVersion = version as string;
  next();
};
