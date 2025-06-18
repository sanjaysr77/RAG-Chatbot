// chatbot.js
import path from "path";
import { fileURLToPath } from "url";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";

// ✅ Needed for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../docs/sample.txt");

let retriever; // global retriever reference

export async function setupRAG() {
  const loader = new TextLoader(filePath);
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const splitDocs = await splitter.splitDocuments(rawDocs);

  const embeddings = new OllamaEmbeddings({ model: "llama3" });

  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
  retriever = vectorStore.asRetriever();
}

export async function getRAGResponse(input, chatModel) {
  const docs = await retriever.getRelevantDocuments(input);
  const context = docs.map(d => d.pageContent).join("\n");

  const prompt = PromptTemplate.fromTemplate(`
You are an assistant that answers questions using only the context below:
----------------
{context}
----------------
Question: {question}
`);

  // ✅ FIXED: Do not use prompt.pipe(chatModel) inside from()
  const chain = RunnableSequence.from([
    prompt,
    chatModel
  ]);

  const result = await chain.invoke({
    context,
    question: input
  });

  return result.content;
}
