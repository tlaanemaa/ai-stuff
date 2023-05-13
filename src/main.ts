import "dotenv/config";
import { MathemApi } from "./tools/mathem/MathemApi.js";

const api = new MathemApi()
const products = await api.searchProducts("banana")
console.log(products.map(x => x.fullName + " -> " + x.price))