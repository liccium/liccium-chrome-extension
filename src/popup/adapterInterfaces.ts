// Interfaces for the legacy API response
export interface LegacyResponse {
    q: string;
    hashBits: string;
    invalidCount: number;
    version: string;
    results: LegacyResult[];
  }
  
  export interface LegacyResult {
    id: string;
    resourceMetadata: {
      owner: string;
      declarer: string;
      chain: {
        isMainnet: boolean;
        name: string;
        type: string;
      };
      registrar: string;
      isccId: string;
      message: string;
      revison: number;
      txHash: string;
      meta_url: string;
      timestamp: number;
    };
    isccMetadata: {
      [key: string]: any;
    };
    credentials: any[];
    nnsId: number;
    redacted: boolean;
    error: string | null;
    origin: string;
    distance: number | null;
  }
  
  // Interfaces for the new API response
  export interface NewResponse {
    [key: string]: any;
    results: NewResult[];
  }
  
  export interface NewResult {
    score: number;
    s3MapItemId: string;
    keyId: string;
    s3Path: string;
    status: string;
    docBody: {
      metaInternal: {
        isccCode: string;
        companyId: string;
        vectorDbId: string;
        s3path: string;
        s3bucket: string;
      };
      signature: string;
      declarationMetadata: {
        publicMetadata: {
          [key: string]: any;
        };
      };
    };
  }
  