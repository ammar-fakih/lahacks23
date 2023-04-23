import { PineconeClient } from '@pinecone-database/pinecone';
import { GET_PINECONE_ENVIRONMENT, GET_PINECONE_API_KEY } from '@/config/pinecone';

export async function initPinecone(use_cohere: boolean) {
  try {
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: GET_PINECONE_ENVIRONMENT(use_cohere),
      apiKey: GET_PINECONE_API_KEY(use_cohere),
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}