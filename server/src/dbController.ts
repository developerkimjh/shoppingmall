import fs from "fs";
import { resolve } from "path";

export const DBField = {
  CART: "cart",
  PRODUCTS: "products",
};

const basePath = resolve();

const filenames = {
  [DBField.CART]: resolve(basePath, "src/db/cart.json"),
  [DBField.PRODUCTS]: resolve(basePath, "src/db/products.json"),
};

export const readDB = (target: any) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], "utf-8"));
  } catch (err) {
    console.log(err);
  }
};

export const writeDB = (target: any, data: any) => {
  try {
    fs.writeFileSync(filenames[target], JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
