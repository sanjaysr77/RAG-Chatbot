import readline from "readline";
import { setupRAG, getRAGResponse } from "./chatbot.js";
import { chatModel } from "./llm.js"; // make sure llm.js exports this

// Set up the CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

await setupRAG(); // Load and embed documents

const ask = () => {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const reply = await getRAGResponse(input, chatModel);
    console.log("Bot:", reply);
    ask(); // Loop back to keep the chat going
  });
};

ask(); // 🔥 Start the chat loop
