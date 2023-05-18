import { Tool } from "langchain/tools";
import { Mathem } from "../clients/Mathem/Mathem.js";
import { TranslatorService } from "./Translator.js";

export class MathemProductLookup extends Tool {
  public readonly name = "Grocery search engine";
  public readonly description = [
    "Useful when you need to look up an ingredient.",
    "Input should be the name of a single component.",
    "The response will be the top match along with its price and URL.",
  ].join(" ");

  private readonly swedishTranslator = new TranslatorService(
    "English",
    "Swedish"
  );
  private readonly englishTranslator = new TranslatorService(
    "Swedish",
    "English"
  );
  private readonly mathem = new Mathem();

  protected async _call(prompt: string) {
    try {
      const promptInSwedish = await this.swedishTranslator.call(prompt);
      const products = await this.mathem.searchProducts(promptInSwedish, 1);
      const trimmedProducts = await Promise.all(
        products.map(async (x) => ({
          name: await this.englishTranslator.call(x.fullName),
          unit: x.unit,
          price: x.price,
          url: `https://www.mathem.se${x.url}`,
        }))
      );

      return JSON.stringify(trimmedProducts);
    } catch (e: unknown) {
      return (e as Error).message;
    }
  }
}
