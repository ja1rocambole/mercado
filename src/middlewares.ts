import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IMarket } from "./interfaces";

export const middlewaresProductNameAlreadyExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: any | IMarket[] = req.body;
  const method = req.method;
  if (method === "POST") {
    const allreadyExists = payload.every((product: any | IMarket) => {
      const name = product.name;

      const findProduct = market.some((product) => {
        return product.name === name;
      });
      return findProduct;
    });

    if (allreadyExists) {
      return res.status(409).json({
        error: "Product already registered",
      });
    }
  } else if (method === "PATCH") {
    const name = payload.name;

    const findProduct = market.some((product) => {
      return product.name === name;
    });

    if (findProduct) {
      return res.status(409).json({
        error: "Product already registered",
      });
    }
  }

  next();
};

export const middlewaresProductIdNotExits = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idParam = req.params.id;

  const idExists = market.some((product) => {
    return product.id === Number(idParam);
  });

  if (!idExists) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  next();
};
