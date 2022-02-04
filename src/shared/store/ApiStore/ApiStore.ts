import {ApiResponse, IApiStore, RequestParams, StatusHTTP} from './types';

export default class ApiStore implements IApiStore {
  baseUrl: string;
  status!: StatusHTTP;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${params.endpoint}?${params.data}`,
        {
          method: params.method,
          headers: params.headers,
        }
      );

      this.status = response.status;
      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }

      return Promise.resolve({
        success: true,
        data: result,
        status: response.status,
      });
    } catch (error) {
      return Promise.reject({
        success: false,
        data: error,
        status: this.status,
      });
    }
  }
}
