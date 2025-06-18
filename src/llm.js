import { ChatOllama } from "langchain/chat_models/ollama";

export const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434", // default Ollama endpoint
  model: "llama3",                   // or any other installed model
});
