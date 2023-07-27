import express, { Application, Request, Response } from "express";
import {
  logicsCreateProducts,
  logicsDeleteProductWithId,
  logicsReadProducts,
  logicsReadProductWithId,
  logicsUpdateProductWithId,
} from "./logics";
import {
  middlewaresProductIdNotExits,
  middlewaresProductNameAlreadyExists,
} from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post(
  "/products",
  middlewaresProductNameAlreadyExists,
  logicsCreateProducts
);

app.get("/products", logicsReadProducts);

app.get("/products/:id", middlewaresProductIdNotExits, logicsReadProductWithId);

app.patch(
  "/products/:id",
  middlewaresProductIdNotExits,
  middlewaresProductNameAlreadyExists,
  logicsUpdateProductWithId
);

app.delete(
  "/products/:id",
  middlewaresProductIdNotExits,
  logicsDeleteProductWithId
);

const PORT: number = 3000;
const runningMsg = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
