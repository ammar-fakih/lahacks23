import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import fs from 'fs';

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
      chunkSize: 300,
      chunkOverlap: 0,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new CohereEmbeddings({
      apiKey: process.env.COHERE_API_KEY,
      modelName: 'large',
      batchSize: 1,
    });
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    console.log('embedding docs...');
    

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await fs.readdir(directory, async (err: any, folders: string[]) => {
    console.log(folders);
    if (err) {
      // handle error; e.g., folder didn't exist
      console.log(err);
    }
    for (let folder_i in folders) {
      console.log('folder: ', folders[folder_i]);
      await run(`${directory}/${folders[folder_i]}`);

      //await () => {};
      //await run(directory+folder);
    }
  });

  console.log('ingestion complete');
})();