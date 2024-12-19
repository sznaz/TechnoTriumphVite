import HttpService from "../../../../service/httpService";

export class InviteService {
    private static _singleton: boolean = true;
    private static _instance: InviteService;
    INVITE_BASE_URL: unknown = import.meta.env.VITE_RECRUITER_BASE_URL; 
    INVITE_URL: string = 'invite'; 

    readonly SENT_INVITE_URL : string = `${this.INVITE_BASE_URL}${this.INVITE_URL}/invite`
    readonly GET_INVITE_BY_TENANT_URL : string = `${this.INVITE_BASE_URL}${this.INVITE_URL}`
    readonly POST : string = "POST"
    readonly PUT : string = "PUT"
    readonly GET : string = "GET"
    readonly UPDATE : string = "UPDATE"
  constructor() {
    if (InviteService._singleton) {
        throw new SyntaxError(
          'This is a singleton class. Please use JobService.instance instead!',
        );
      }
  } 

  public static get instance(): InviteService  {
    if (!this._instance) {
      this._singleton = false;
      this._instance = new InviteService ();
      this._singleton = true;
    }
    return this._instance;
  }

  async sendInvite(payload: { name: string; email: string; tenant: string | null; role: string }) {
    const response = await HttpService.instance.callApi(
        this.POST,
        this.SENT_INVITE_URL,
        true,
        payload
     );
      return response;
  }
  async getInviteByTenant(tenant: string | null ){
    const response = await HttpService.instance.callApi(
      this.GET,
      `${this.GET_INVITE_BY_TENANT_URL}/tenant/${tenant}`,
      true,
   );
    return response;

  }
 
}