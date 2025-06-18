import { ChatPromptTemplate } from "langchain/prompts";

export const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["human", "{input}"],
]);
