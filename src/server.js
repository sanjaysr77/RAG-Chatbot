import express from "express";
import cors from "cors";
import { setupRAG, getRAGResponse } from "./chatbot.js";
import { chatModel } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

await setupRAG(); // Initialize RAG pipeline on start

app.post("/chat", async (req, res) => {
  const { input } = req.body;
  if (!input) return res.status(400).json({ error: "Missing input" });

  try {
    const output = await getRAGResponse(input, chatModel);
    res.json({ output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
