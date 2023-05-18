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
      "Create a meal plan with dinners for the week.",
      "Check that the ingredients are available on the grocery search engine before using them.",
      "Minimize the amount of ingredients used and wasted.",
      "Return me the recipes and the combined shopping list for ingredients.",
    ].join("\n");

    const result = await executor.call({ input });
    return result;
  }
}
