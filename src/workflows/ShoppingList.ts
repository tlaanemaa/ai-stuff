import { ChainValues } from "langchain/schema";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { MathemProductLookup } from "../tools/MathemProductLookup.js";
import { Calculator } from "langchain/tools/calculator";
import { RecipeIngredients } from "../tools/RecipeIngredients.js";
import { DEFAULT_MODEL_NAME } from "../constants.js";

export class ShoppingList {
  private readonly model = new ChatOpenAI({
    temperature: 0,
    modelName: DEFAULT_MODEL_NAME,
  });

  private readonly tools = [
    new MathemProductLookup(),
    new RecipeIngredients(),
    new Calculator(),
  ];

  public async run(): Promise<ChainValues> {
    const executor = await initializeAgentExecutorWithOptions(
      this.tools,
      this.model,
      {
        agentType: "chat-zero-shot-react-description",
        verbose: true,
      }
    );

    const input = [
      "Make up a dinner recipe.",
      "Check that the ingredients are available on the grocery search engine before using them.",
      "Minimize the amount of ingredients used and wasted.",
      "The final answer should be the recipe and the list of ingredients and their URLs in the grocery search engine.",
    ].join(" ");

    const result = await executor.call({ input });
    return result;
  }
}
