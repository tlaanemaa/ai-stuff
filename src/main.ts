import "dotenv/config";
import { ShoppingList } from "./workflows/ShoppingList.js";

console.log(await new ShoppingList().run());
