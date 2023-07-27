export interface IProduct {
  id: number;
  name: string;
  price: number; //em centavos
  weight: number; // em gramas
  section: "food" | "cleaning";
  expirationDate: Date;
}

export interface ICleaningProduct extends IProduct {}

export interface IFoodProduct extends IProduct {
  calories: number;
}

export type IMarket = ICleaningProduct | IFoodProduct;
