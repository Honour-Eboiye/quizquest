import { put } from '@vercel/blob';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const uploadData = async () => {
  try {
    // Read the userInfo.json file
    const data = await fs.readFile('./db/userInfo.json', 'utf-8');

    // Upload the JSON data to Vercel Blob
    const result = await put('userInfo.json', data, {
      access: 'public', // Make the blob publicly accessible
      token: process.env.BLOB_READ_WRITE_TOKEN, // Use the token from .env
    });

    console.log('Data uploaded successfully:', result.url);
  } catch (error) {
    console.error('Error uploading data:', error);
  }
};

uploadData();