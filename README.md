🧠 RAG Chatbot
A simple chatbot that answers your questions based on your own documents using **LangChain**, **Ollama**, and a **React + Vite frontend**.

✅ Prerequisites

- Node.js `v18+`
- Ollama installed and running  
  (Start it with: `ollama run llama3.2`)

⚙️ Backend Setup

npm install
npm run dev

💻 Frontend Setup

cd frontend
npm install
npm run dev

📁 Add Your Data

Edit or replace this file to change the chatbot’s context:

docs/sample.txt

🔄 Switch to GPT or Claude

To switch from Ollama to GPT or Claude:

1. Go to `backend/src/llm.js`
2. Replace Ollama-specific code with the relevant model.

✅ Current (Ollama version):

llm.js
import { ChatOllama } from "langchain/chat_models/ollama";

export const chatModel = new ChatOllama({
  model: "llama3",
});


🔁 To Use GPT-4 (OpenAI):

llm.js
import { ChatOpenAI } from "langchain/chat_models/openai";

export const chatModel = new ChatOpenAI({
  modelName: "gpt-4",
  openAIApiKey: process.env.OPENAI_API_KEY,
});
