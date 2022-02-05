import {
  ApiResponse,
  HTTPMethod,
  IApiStore,
  RequestParams,
  StatusHTTP,
} from './types';

export default class ApiStore implements IApiStore {
  baseUrl: string;
  status!: StatusHTTP;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    let url = `${this.baseUrl}/${params.endpoint}`;
    const isGetMethod = params.method === HTTPMethod.GET;
    const isPostMethod = params.method === HTTPMethod.POST;

    if (isGetMethod) {
      url += `?${params.data}`;
    }

    try {
      const response = await fetch(url, {
        method: params.method,
        headers: params.headers,
        body: isPostMethod ? JSON.stringify(params.data) : null,
      });

      this.status = response.status;

      const jsonData = await response.json();

      return {
        success: response.ok,
        data: jsonData,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error,
        status: this.status,
      };
    }
  }
}
