import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { MathemProductLookup } from "../tools/mathem/index.js";
import { Calculator } from "langchain/tools/calculator";
import { RecipeIngredients } from "../tools/RecipeIngredients.js";

export const run = async () => {
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });
  const tools = [
    new MathemProductLookup(),
    new RecipeIngredients(),
    new Calculator(),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-zero-shot-react-description",
    verbose: true,
  });
  console.log("Loaded agent.");

  const input = `
  Create a meal plan with dinners for the week.
  Check that the ingredients are available on the grocery search engine before using them.
  Minimize the amount of ingredients used and wasted.
  Return me the recipes and the combined shopping list for ingredients.
  `;

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );
};

run();
