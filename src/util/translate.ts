import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  translation: "The translation of the provided text",
});

const prompt = new PromptTemplate({
  template:
    'Answer the users question as best as possible.\n{format_instructions}\nWhat is "{text}" in Swedish?',
  inputVariables: ["text"],
  partialVariables: { format_instructions: parser.getFormatInstructions() },
});

const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });

export const translateToSwedish = async (text: string) => {
  const input = await prompt.format({ text });
  const response = await model.call(input);
  const parsed = (await parser.parse(response)) as { translation: string };
  return parsed.translation;
};
