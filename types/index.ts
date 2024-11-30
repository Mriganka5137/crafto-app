export interface Quote {
  id: number;
  text: string;
  mediaUrl: string | null;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteResponse {
  data: Quote;
}

export interface LoginResponse {
  token: string;
}

export interface CreateQuoteRequest {
  text: string;
  mediaUrl: string | null;
}

export interface UploadResponseItem {
  type: string;
  url: string;
}

export interface LoginRequest {
  username: string;
  otp: string;
}
