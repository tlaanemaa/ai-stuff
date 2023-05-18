import { Tool } from "langchain/tools";
import { Mathem } from "../clients/Mathem/Mathem.js";
import { TranslatorService } from "./Translator.js";

export class MathemProductLookup extends Tool {
  public readonly name = "Grocery search engine";
  public readonly description = [
    "A grocery search engine.",
    "Useful when you need to look up a component for a recipe, its availability and it price.",
    "NOT to be used to look up recipes",
    "Input should be the name of a single component.",
    "The response will be the top 3 component matches.",
  ].join(" ");

  private readonly translator = new TranslatorService("Swedish");
  private readonly api = new Mathem();

  protected async _call(prompt: string) {
    try {
      const promptInSwedish = await this.translator.call(prompt);
      const products = await this.api.searchProducts(promptInSwedish, 3);
      const trimmedProducts = products.map((x) => ({
        name: x.fullName,
        unit: x.unit,
        price: x.price,
        url: x.url,
      }));

      return JSON.stringify(trimmedProducts);
    } catch (e: unknown) {
      return (e as Error).message;
    }
  }
}
