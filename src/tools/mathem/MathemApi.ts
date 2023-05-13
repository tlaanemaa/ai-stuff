import { MathemProduct } from "./types.js";

export class MathemApi {
  public async searchProducts(query: string, topN = 3) {
    const args = {
      size: topN,
      index: 0,
      searchType: "searchResult",
      sortTerm: "popular",
      sortOrder: "desc",
      storeId: 23,
      type: "p",
      q: query,
    };

    const argsString = Object.entries(args)
      .map(([key, value]) => [key, value].join("="))
      .join("&");

    const response = await fetch(
      `https://api.mathem.io/product-search/noauth/search/query?${argsString}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en,et;q=0.9",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        },
        referrerPolicy: "same-origin",
        body: null,
        method: "GET",
      }
    );

    const responsePayload = await response.json();
    return responsePayload.products as MathemProduct[];
  }
}
