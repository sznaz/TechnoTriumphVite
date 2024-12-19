import Interceptor from "../interceptor/intercept";

class HttpService {
  private static _singleton: boolean = true;
  private static _instance: HttpService;
  AUTH_BASE_URL: unknown = import.meta.env.VITE_AUTH_BASE_URL; 
  AUTH_URL: string = "auth"; 
  accessToken: string | null;
  refreshToken: string | null = localStorage.getItem("refreshToken");

  constructor() {
    this.accessToken = null;
    if (HttpService._singleton) {
      throw new SyntaxError(
        "This is a singleton class. Please use HttpService.instance instead!"
      );
    }
  }

  public static get instance(): HttpService {
    if (!this._instance) {
      this._singleton = false;
      this._instance = new HttpService();
      this._singleton = true;
    }
    return this._instance;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private async refreshhToken(){
    if (!this.refreshToken){
      return null;
    } 
  const url = `${ this.AUTH_BASE_URL}${this.AUTH_URL}/refresh`
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-refresh-token": this.refreshToken,
      },
    });

    if (!response.ok) {
      console.error("Failed to refresh token. Status:", response.status);
      return null;
    }

    const data = await response.json(); 
    if (data && data.data.accessToken) {
      localStorage.setItem('refreshToken', data.data.refreshToken);
      this.accessToken = data.data.accessToken;
      return data.data.accessToken; 
    } else {
      console.error("Invalid response structure. 'accessToken' not found in response.");
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
  }

  public callApi = async (
    method: string,
    url: string,
    token: boolean = false,
    payload?: unknown,
    extraHeaders: Record<string, string> = {},
    contentType: string | null = null
  ) => {
    const headers: HeadersInit = {
      "Content-Type": contentType || "application/json",
      ...extraHeaders,
    };

    if (token) {
      headers["Authorization"] = `${this.getAccessToken()}`;
    }

    const requestOptions: RequestInit = {
      method: method,
      headers,
    };
    if (payload) {
      requestOptions.body = JSON.stringify(payload);
    }

    try {
      const response = await fetch(url, requestOptions);

      // Pass the response through the interceptor
      let processedResponse = await Interceptor.handleResponse(response);
      console.log(processedResponse)

      if (processedResponse.status === 400 || processedResponse.status === 403 ) {
        const newAccessToken = await this.refreshhToken();
        if (newAccessToken) {
          headers["Authorization"] = `${newAccessToken}`;

          // Retry the request with the refreshed token
          const retryResponse = await fetch(url, { ...requestOptions, headers });
          processedResponse = await Interceptor.handleResponse(retryResponse);
        }else {
          window.location.href = "/auth/login";
        }
      }
      console.log(processedResponse)
      return processedResponse;
    } catch (error) {
      // Return any caught errors as a response-like object
      return { status: 500, data: error };
    }
  };
}

export default HttpService;
