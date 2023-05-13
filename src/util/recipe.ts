import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({ ingredients: z.array(z.string()) })
);

const prompt = new PromptTemplate({
  template:
    'Answer the users question as best as possible.\n{format_instructions}\nWhat are the ingredients for "{recipe}"',
  inputVariables: ["recipe"],
  partialVariables: { format_instructions: parser.getFormatInstructions() },
});

const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });

export const getRecipeIngredients = async (recipe: string) => {
  const input = await prompt.format({ recipe });
  const response = await model.call(input);
  const parsed = (await parser.parse(response)) as { ingredients: string[] };
  return parsed.ingredients;
};
