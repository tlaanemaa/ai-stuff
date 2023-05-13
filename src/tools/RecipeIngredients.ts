import { Tool } from "langchain/tools";
import { getRecipeIngredients } from "../util/recipe.js";

export class RecipeIngredients extends Tool {
  public readonly name = "Recipe component finder";
  public readonly description = [
    "Recipe component finder.",
    "Useful when you need to find the ingredients of a recipe.",
  ].join("\n");

  protected async _call(recipe: string) {
    try {
      const ingredients = await getRecipeIngredients(recipe);
      return JSON.stringify(ingredients);
    } catch (e: unknown) {
      return (e as Error).message;
    }
  }
}
