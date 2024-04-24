// Interfaces for the legacy API response

import { LegacyResponse, NewResponse } from "./adapterInterfaces";

  // Function to adapt the new API response to the legacy format
  function adaptNewResponse(newResponse: NewResponse): LegacyResponse {
    alert(JSON.stringify(newResponse, null, 2))
    const legacyResponse: LegacyResponse = {
      q: newResponse.q || "",
      hashBits: newResponse.hashBits || "",
      invalidCount: newResponse.invalidCount || 0,
      version: newResponse.version || "",
      results: newResponse.results.map((result) => ({
        id: result.s3MapItemId,
        resourceMetadata: {
          owner: "",
          declarer: "",
          chain: {
            isMainnet: false,
            name: "",
            type: "",
          },
          registrar: "",
          isccId: result.docBody.metaInternal.isccCode,
          message: "",
          revison: 0,
          txHash: "",
          meta_url: "",
          timestamp: 0,
        },
        isccMetadata: result.docBody.declarationMetadata.publicMetadata,
        credentials: [],
        nnsId: parseInt(result.s3MapItemId),
        redacted: false,
        error: null,
        origin: "",
        distance: null,
      })),
    };
  
    return legacyResponse;
  }
  
  // Function to call the new API and translate the result
  export async function callNewApiAndTranslate(ISCC:string): Promise<LegacyResponse> {
    try {
      // Make the API call to the new endpoint
      // get from local storage, default value is for testing
     const bearer  =  localStorage.getItem('bearer') || "NONE"
     const customerId = localStorage.getItem('customerId') || "NO-CID"
     const fullURL = `https://1fmh9kqvna.execute-api.eu-central-1.amazonaws.com/api/v1/search?iscc=${ISCC}`
     alert(fullURL)
      const response = await fetch( fullURL,
        {
          method: "GET",
          headers: {
            "Bearer":  bearer,
            "x-customer-id":  customerId
          },
        });
      const newResponse: NewResponse = await response.json();
  
      // Adapt the new response to the legacy format
      const legacyResponse = adaptNewResponse(newResponse);
  
      return legacyResponse;
    } catch (error) {
      console.error("Error calling the new API:", error);
      alert(error)
      throw error;
    }
  }
  
  // Usage example
//   callNewApiAndTranslate()
//     .then((legacyResponse) => {
//       console.log("Legacy API response:", legacyResponse);
//       // Handle the legacy response data as needed
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       // Handle the error
//     });