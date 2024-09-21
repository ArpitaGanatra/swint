"use server";

import express from "express";
import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://api.red-pill.ai/v1",
  apiKey: "sk-q2w8m0zbDrBmIXVjrgLuBZnuMn1I4lDug3vRk7OzkexBRvjV",
});

const app = express();
app.use(express.json());

export async function getStructuredResponse(userInput: string) {
  const prompt = `
  You are an AI that converts user input into a structured JSON format for cross-chain swaps. 
  The user will provide a statement about swapping tokens across different blockchains. 
  Your task is to extract the necessary information and return it in the following JSON format:

  {
    "srcChain": "<source_chain_name>",
    "dstChain": "<destination_chain_name>",
    "amount": "<amount_in_wei>",
    "receiverAddress": "<user_wallet_address>",
    "enableEstimate": "true",
    "auctionStartAmount": "<amount_in_wei>"
  }

  Example input: "I want to swap 100 USDC Base with ETH on Arbitrum"
  Example output: 
  {
    "srcChain": "base",
    "dstChain": "Arbitrum",
    "amount": "100000000",
    "walletAddress": "0xYourWalletAddress",
    "enableEstimate": "true",
    "auctionStartAmount": "100000000"
  }

  User input: "${userInput}"

  IMPORTANT: ONLY JSON OUTPUT AND NOTHING ELSE FOR GODS SAKE PLEASE
  `;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    model: "gpt-4o",
  });

  return JSON.parse(completion.choices[0].message.content!);
}
