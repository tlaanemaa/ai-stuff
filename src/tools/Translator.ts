import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { DEFAULT_MODEL_NAME } from "../constants.js";
import { Tool } from "langchain/tools";

export class TranslatorService extends Tool {
  public readonly name = "Translator";
  public readonly description = `Useful when you need to translate text from English into ${this.targetLanguage}.`;

  private readonly model = new OpenAI({
    temperature: 0,
    modelName: DEFAULT_MODEL_NAME,
  });

  private readonly parser = StructuredOutputParser.fromNamesAndDescriptions({
    translation: "The translation of the provided text",
  });

  private readonly prompt = new PromptTemplate({
    template: [
      "Answer the users question as best as possible.",
      "{format_instructions}",
      `Please translate "{text}" from {sourceLanguage} to {targetLanguage}.`,
    ].join("\n"),
    inputVariables: ["text", "sourceLanguage", "targetLanguage"],
    partialVariables: {
      format_instructions: this.parser.getFormatInstructions(),
    },
  });

  constructor(
    private readonly sourceLanguage = "English",
    private readonly targetLanguage = "Swedish"
  ) {
    super();
  }

  public async _call(text: string) {
    const input = await this.prompt.format({
      text,
      sourceLanguage: this.sourceLanguage,
      targetLanguage: this.targetLanguage,
    });
    const response = await this.model.call(input);
    const parsed = (await this.parser.parse(response)) as {
      translation: string;
    };

    console.debug(" >> Translated", text, "to", parsed.translation);
    return parsed.translation;
  }
}
