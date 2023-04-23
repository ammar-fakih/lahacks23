/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */
const GET_PINECONE_INDEX_NAME = (use_cohere: boolean) => (use_cohere ? process.env.COHERE_PINECONE_INDEX_NAME : process.env.OPENAI_PINECONE_INDEX_NAME) as string;

const GET_PINECONE_ENVIRONMENT = (use_cohere: boolean) => (use_cohere ? process.env.COHERE_PINECONE_ENVIRONMENT : process.env.OPENAI_PINECONE_ENVIRONMENT) as string;

const GET_PINECONE_API_KEY = (use_cohere: boolean) => (use_cohere ? process.env.COHERE_PINECONE_API_KEY : process.env.OPENAI_PINECONE_API_KEY) as string;



export { GET_PINECONE_INDEX_NAME, GET_PINECONE_ENVIRONMENT, GET_PINECONE_API_KEY };
