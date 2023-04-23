import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { initPinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { GET_PINECONE_INDEX_NAME, GET_PINECONE_API_KEY } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import fs from 'fs';

import FileSaver from 'file-saver';


const use_cohere = true;

const cohere_pinecone = await initPinecone(true);
const openai_pinecone = await initPinecone(false);
const pinecone = use_cohere ? cohere_pinecone : openai_pinecone;
// console.log("----- PINECONE ----- ");
// // console.log(pinecone);
// // console.log("\n\n");
// console.log(JSON.stringify(cohere_pinecone));
// console.log("\n");
// console.log(JSON.stringify(openai_pinecone));
// console.log("\n\n\n\n");

/* Name of directory to retrieve your files from */
const directory = 'docs';

export const run = async (filePath: string) => {
  try {
    const namespace = filePath.split('/')[1];
    // console.log('namespace', namespace);

    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();
    const content = rawDocs[7].pageContent;

    console.log(content);


    // var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, namespace+".txt");



    // const link = document.createElement("a");
    // const file = new Blob([content], { type: 'text/plain' });
    // link.href = URL.createObjectURL(file);
    // link.download = filePath+".txt";
    // link.click();
    // URL.revokeObjectURL(link.href);

    // return;

    /* Split text into chunks */
    // const textSplitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 1000,
    //   chunkOverlap: 200,
    // });

    // const docs = await textSplitter.splitDocuments(rawDocs);

    

    // console.log("DOCS");
    // console.log(docs);
    // console.log(JSON.stringify(docs[0].metadata.loc));
    // console.log("\n\n\n");

    // const cohere_embeddings = new CohereEmbeddings({
    //   verbose: true,
    //   modelName: "small",
    //   apiKey: GET_PINECONE_API_KEY(true),
    //   batchSize: 512,
    // });
    // const openai_embeddings = new OpenAIEmbeddings();
    // const embeddings = use_cohere ? cohere_embeddings : openai_embeddings;

    // console.log("----- EMBEDDINGS ----- ");
    // // console.log(embeddings);
    // // console.log("\n\n");
    // console.log(JSON.stringify(cohere_embeddings));
    // console.log("\n");
    // console.log(JSON.stringify(openai_embeddings))
    // console.log("\n\n\n\n");


    // const cohere_index = cohere_pinecone.Index(GET_PINECONE_INDEX_NAME(true));
    // const openai_index = openai_pinecone.Index(GET_PINECONE_INDEX_NAME(false));
    // const index = use_cohere ? cohere_index : openai_index;

    // console.log("----- INDEXES     ----- ");
    // // console.log(index);
    // // console.log("\n\n");
    // console.log(JSON.stringify(cohere_index));
    // console.log("\n");
    // console.log(JSON.stringify(openai_index));
    // console.log("\n\n\n\n");


    // console.log('creating vector store...');
    // /*create and store the embeddings in the vectorStore*/
  
    // // embed the PDF documents
    // const res = await PineconeStore.fromDocuments(docs, embeddings, {
    //   pineconeIndex: index,
    //   // namespace,
    //   textKey: 'text',
    // });
    // console.log("Vector Store Created:", res);

  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await fs.readdir(directory, async (err: any, folders: string[]) => { 
    console.log(folders);
    if(err) { 
      // handle error; e.g., folder didn't exist 
      console.log(err);
    } 
    for (let folder_i in folders) {
      if (folders[folder_i] == "tensor"){
        await run(`${directory}/${folders[folder_i]}`);
        return;
      }
    }
    // console.log('ingestion complete');
  });
})();

// run using 'npm run ingest >> *filepath*.txt'