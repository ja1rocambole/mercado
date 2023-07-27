import { Request, Response } from "express";
import { market, ids } from "./database";
import { IMarket } from "./interfaces";

export const logicsCreateProducts = (req: Request, res: Response) => {
  const payload = req.body;

  let newProducts: IMarket[] = [];
  let totalPriceNewProducts: number = 0;

  payload.forEach((product: any | IMarket) => {
    const lastId: number = ids[ids.length - 1];
    const newId = lastId + 1;

    ids.push(newId);

    const today: Date = new Date();
    const expiredDay: Date = new Date(
      today.setFullYear(today.getFullYear() + 1)
    );

    const newProduct: IMarket = {
      id: newId,
      name: product.name,
      price: product.price,
      weight: product.weight,
      calories: product.calories,
      section: product.section,
      expirationDate: expiredDay,
    };

    market.push(newProduct);
    newProducts.push(newProduct);

    totalPriceNewProducts = totalPriceNewProducts + product.price;
  });

  return res.status(201).json({
    total: totalPriceNewProducts,
    marketProducts: newProducts,
  });
};

export const logicsReadProducts = (req: Request, res: Response) => {
  let totalPriceNewProducts: number = 0;

  market.forEach((product) => {
    totalPriceNewProducts = totalPriceNewProducts + product.price;
  });

  return res
    .status(200)
    .json({ total: totalPriceNewProducts, marketProducts: market });
};

export const logicsReadProductWithId = (req: Request, res: Response) => {
  const idParam = req.params.id;

  const indexProduct = market.findIndex((product) => {
    return product.id === Number(idParam);
  });

  return res.status(200).json(market[indexProduct]);
};

export const logicsUpdateProductWithId = (req: Request, res: Response) => {
  const idParam = req.params.id;
  const payload = req.body;

  const indexProduct = market.findIndex((product) => {
    return product.id === Number(idParam);
  });

  const { id, expirationDate, section, ...productUpdate } = payload;

  market[indexProduct] = {
    ...market[indexProduct],
    ...productUpdate,
  };

  return res.status(200).json(market[indexProduct]);
};

export const logicsDeleteProductWithId = (req: Request, res: Response) => {
  const idParam = req.params.id;

  const indexProduct = market.findIndex((product) => {
    return product.id === Number(idParam);
  });

  market.splice(indexProduct, 1);

  return res.status(204).json();
};
