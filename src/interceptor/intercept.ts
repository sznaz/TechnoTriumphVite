/* eslint-disable @typescript-eslint/no-explicit-any */
class Interceptor {
    static async handleResponse(response: Response): Promise<any> {
      try {
        if (response.ok) {
          const data = await response.json();
          console.log(response)
          return { status: response.status, data };
        } else {
          const errorData = await response.json();
          console.log(errorData)
          return { status: response.status, data: errorData };
        }
      } catch (error) {
        throw { status: 500, data: error || "Unexpected error occurred." };
      }
    }
  }
  
  export default Interceptor;