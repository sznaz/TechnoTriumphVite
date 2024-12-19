import HttpService from "../../../../service/httpService";

export class AuthService {
    private static _singleton: boolean = true;
    private static _instance: AuthService;
    AUTH_BASE_URL: unknown = import.meta.env.VITE_AUTH_BASE_URL; 
    AUTH_URL: string = 'auth'; 
   
    readonly LOGIN_URL : string = `${this.AUTH_BASE_URL}${this.AUTH_URL}/login`
    readonly SEND_OTP_URL : string = `${this.AUTH_BASE_URL}${this.AUTH_URL}/otp/send`
    readonly VERIFY_LINK_URL : string = `${this.AUTH_BASE_URL}${this.AUTH_URL}/link/verify`
    readonly VERIFY_OTP_URL : string = `${this.AUTH_BASE_URL}${this.AUTH_URL}/otp/verify`
    readonly REGISTER_URL : string = `${this.AUTH_BASE_URL}${this.AUTH_URL}/register`
    readonly POST : string = "POST"
    readonly PUT : string = "PUT"
    readonly GET : string = "GET"
    readonly UPDATE : string = "UPDATE"
  constructor() {
    if (AuthService._singleton) {
        throw new SyntaxError(
          'This is a singleton class. Please use AuthService.instance instead!',
        );
      }
  } 

  public static get instance(): AuthService {
    if (!this._instance) {
      this._singleton = false;
      this._instance = new AuthService();
      this._singleton = true;
    }
    return this._instance;
  }
  async login(email: string, password: string) {
    const body = { email, password };
    const response = await HttpService.instance.callApi(this.POST,this.LOGIN_URL, false, body);
    return response;
  }

  async sendOtp(fullname: string, email: string) {
    const body = {fullname, email };
    const response = await HttpService.instance.callApi(this.POST,this.SEND_OTP_URL, false, body);
   
    return response;
  }
  async verifyLink(shortId: string) {
    const body = { shortId };
    const response = await HttpService.instance.callApi(this.POST,this.VERIFY_LINK_URL, false, body);
   
    return response;
  }
  async verifyOtp(email: string, otp: string, otpToken: string) {
    const body = {otp, email };
    const extraHeaders = { 'x-otpaccess-token': otpToken }
    const response = await HttpService.instance.callApi(this.POST,this.VERIFY_OTP_URL,false, body, extraHeaders );
 
    return response;
  }

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async register(fullname: string, email: string, password: string, roles: string[], registerToken: any){
    const body = {fullname, email, password, roles};
    const extraHeaders = { 'x-register-token': registerToken };
    const response = await HttpService.instance.callApi(this.POST, this.REGISTER_URL, false, body, extraHeaders);
    return response;
  }

}