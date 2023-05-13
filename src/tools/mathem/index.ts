import { Tool } from "langchain/tools";
import { MathemApi } from "./MathemApi.js";
import { translateToSwedish } from "../../util/translate.js";

export class MathemProductLookup extends Tool {
  private readonly api = new MathemApi();
  public readonly name = "Grocery search engine";
  public readonly description = [
    "A grocery search engine.",
    "Useful when you need to look up a component for a recipe, its availability and it price.",
    "NOT to be used to look up recipes",
    "Input should be the name of a single component.",
    "The response will be the top 3 component matches.",
  ].join("\n");

  protected async _call(prompt: string) {
    try {
      const promptInSwedish = await translateToSwedish(prompt);
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
