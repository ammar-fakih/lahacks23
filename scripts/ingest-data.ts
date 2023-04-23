import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { initPinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { GET_PINECONE_INDEX_NAME } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import fs from 'fs';

const use_cohere = true;

const cohere_pinecone = await initPinecone(true);
const openai_pinecone = await initPinecone(false);
const pinecone = use_cohere ? cohere_pinecone : openai_pinecone;
console.log("----- PINECONE ----- ");
// console.log(pinecone);
// console.log("\n\n");
console.log(JSON.stringify(cohere_pinecone));
console.log("\n");
console.log(JSON.stringify(openai_pinecone));
console.log("\n\n\n\n");

/* Name of directory to retrieve your files from */
const directory = 'docs';

export const run = async (filePath: string) => {
  try {
    const namespace = filePath.split('/')[1];
    console.log('namespace', namespace);

    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    const cohere_embeddings = new CohereEmbeddings({
      batchSize: 512,
    });
    const openai_embeddings = new OpenAIEmbeddings();
    const embeddings = use_cohere ? cohere_embeddings : openai_embeddings;

    console.log("----- EMBEDDINGS ----- ");
    // console.log(embeddings);
    // console.log("\n\n");
    console.log(JSON.stringify(cohere_embeddings));
    console.log("\n");
    console.log(JSON.stringify(openai_embeddings))
    console.log("\n\n\n\n");


    const cohere_index = cohere_pinecone.Index(GET_PINECONE_INDEX_NAME(true));
    const openai_index = openai_pinecone.Index(GET_PINECONE_INDEX_NAME(false));
    const index = use_cohere ? cohere_index : openai_index;

    console.log("----- INDEXES     ----- ");
    // console.log(index);
    // console.log("\n\n");
    console.log(JSON.stringify(cohere_index));
    console.log("\n");
    console.log(JSON.stringify(openai_index));
    console.log("\n\n\n\n");


    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
  
    // embed the PDF documents
    const res = await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      // namespace,
      // textKey: 'text',
    });
    console.log("Vector Store Created:", res);

  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await fs.readdir(directory, async (err: any, folders: string[]) => { 
    // console.log(folders);
    if(err) { 
      // handle error; e.g., folder didn't exist 
      console.log(err);
    } 
    for (let folder_i in folders) {
      await run(`${directory}/${folders[folder_i]}`);
    }
    console.log('ingestion complete');
  });
})();
