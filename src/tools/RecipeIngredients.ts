import { z } from "zod";
import { Tool } from "langchain/tools";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { DEFAULT_MODEL_NAME } from "../constants.js";

export class RecipeIngredients extends Tool {
  public readonly name = "Recipe component finder";
  public readonly description = [
    "Useful when you need to find the ingredients of a recipe.",
    "The input should be the name of a recipe and the output will be an array of components",
  ].join(" ");

  private readonly model = new OpenAI({
    temperature: 0,
    modelName: DEFAULT_MODEL_NAME,
  });

  private readonly parser = StructuredOutputParser.fromZodSchema(
    z.object({ ingredients: z.array(z.string()) })
  );

  private readonly prompt = new PromptTemplate({
    template:
      'Answer the users question as best as possible.\n{format_instructions}\nWhat are the ingredients for "{recipe}"',
    inputVariables: ["recipe"],
    partialVariables: {
      format_instructions: this.parser.getFormatInstructions(),
    },
  });

  protected async _call(recipe: string) {
    try {
      const input = await this.prompt.format({ recipe });
      const response = await this.model.call(input);
      const parsed = (await this.parser.parse(response)) as {
        ingredients: string[];
      };
      return JSON.stringify(parsed.ingredients);
    } catch (e: unknown) {
      return (e as Error).message;
    }
  }
}
