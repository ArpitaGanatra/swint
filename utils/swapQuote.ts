import axios from "axios";

export async function makeSwap(structuredResponse: any) {
  const url = "https://api.1inch.dev/fusion-plus/quoter/v1.0/quote/receive";

  const params = new URLSearchParams({
    srcChain: "8453",
    dstChain: "42161",
    srcTokenAddress: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    dstTokenAddress: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    amount: structuredResponse.amount,
    walletAddress: structuredResponse.walletAddress,
    enableEstimate: structuredResponse.enableEstimate,
    // Add this line
  });

  try {
    console.log("structure", structuredResponse);
    const response = await axios.post(
      `${url}?${params.toString()}`,
      {
        auctionStartAmount: structuredResponse.amount,
        auctionEndAmount: structuredResponse.amount,
        auctionDuration: 10000,
      },
      {
        headers: { Authorization: "Bearer dz7EXYAcodk8Oeo74KyOK6Myriml8oNT" },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
