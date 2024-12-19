import HttpService from "../../../../service/httpService";


export class JobService {
    private static _singleton: boolean = true;
    private static _instance: JobService;
    JOB_BASE_URL: unknown = import.meta.env.VITE_RECRUITER_BASE_URL; 
    JOB_URL: string = "job";

    readonly CREATE_JOB_URL : string = `${this.JOB_BASE_URL}${this.JOB_URL}`
    readonly GET_JOB_URL : string = `${this.JOB_BASE_URL}${this.JOB_URL}`
    readonly GET_TENANT_JOB: string = `${this.JOB_BASE_URL}${this.JOB_URL}`;
    readonly INDUSTRY_URL: string = `${this.JOB_BASE_URL}industry`;
    readonly COMMON_DOMAIN_URL: string = `${this.JOB_BASE_URL}domain`;
    readonly GENERAL_REQUIREMENT_URL: string = `${this.JOB_BASE_URL}general`;
    readonly SKILL_URL: string = `${this.JOB_BASE_URL}skill`;
    readonly UPDATE_JOB_URL: string = `${this.JOB_BASE_URL}${this.JOB_URL}/`;
    readonly POST : string = "POST"
    readonly PUT : string = "PUT"
    readonly GET : string = "GET"
    readonly UPDATE : string = "UPDATE"
  constructor() {
    if (JobService._singleton) {
        throw new SyntaxError(
          'This is a singleton class. Please use JobService.instance instead!',
        );
      }
  } 

  public static get instance(): JobService {
    if (!this._instance) {
      this._singleton = false;
      this._instance = new JobService();
      this._singleton = true;
    }
    return this._instance;
  }
  async createJob(payload: {
    title: string;
    description: string;
    numPositions: number;
    locations: string[];
    closingDate: number;
    tenant: string | null
  }) {
    const response = await HttpService.instance.callApi(
        this.POST,
        this.CREATE_JOB_URL,
        true,
        payload
      );
      return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getTenantJob ( tenant: string, status: string){
    const response = await HttpService.instance.callApi(this.GET,`${this.GET_TENANT_JOB}/tenant/${tenant}/${status}`, true);
    return response;
  }

  async getIndustries() {
    const response = await HttpService.instance.callApi(this.GET, this.INDUSTRY_URL, true);
    return response;
}
async getCommonDomain() {
  const response = await HttpService.instance.callApi(this.GET, `${this.COMMON_DOMAIN_URL}/common/all`, true);
  return response;
}
async getGeneralRequirement() {
  const response = await HttpService.instance.callApi(this.GET, this.GENERAL_REQUIREMENT_URL, true);
  return response;
}
async getSkill() {
  const response = await HttpService.instance.callApi(this.GET, this.SKILL_URL, true);
  return response;
}
async updateJob(jobId: string, payload: Record<string, any>) {
  const response = await HttpService.instance.callApi(this.PUT, `${this.UPDATE_JOB_URL}${jobId}`, true, payload);
  return response;
}

 
}