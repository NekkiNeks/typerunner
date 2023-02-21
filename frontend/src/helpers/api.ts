import { ServerError, ClientError } from "./Errors";

type ErrorType = {
  message: string;
  code: number;
};

interface iResponse<T> {
  success: boolean;
  data: T;
  error: ErrorType | null;
}

import config from "../config";

class Api {
  private token = localStorage.getItem("token");

  public async get<T = any>(url: string): Promise<T> {
    console.log(url);
    const headers = new Headers();
    if (this.token) headers.append("authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "Application/json");

    const response = await fetch(config.backendUrl + url, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok)
      throw new ServerError(
        `Ошибка при запросе к серверу. Статус: ${response.status}`
      );
    const data = (await response.json()) as iResponse<T>;
    if (data.error) {
      switch (data.error.code) {
        case 0:
          throw new ServerError(data.error.message);
        case 1:
          throw new ClientError(data.error.message);
        default:
          throw new Error(`Необработанная ошибка! ${data.error.message}`);
      }
    }
    return data.data;
  }

  public async post<T = any>(url: string, body: any): Promise<T> {
    const headers = new Headers();
    if (this.token) headers.append("authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "Application/json");

    const response = await fetch(config.backendUrl + url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
    if (!response.ok)
      throw new ServerError(
        `Ошибка при запросе к серверу. Статус: ${response.status}`
      );
    const data = (await response.json()) as iResponse<T>;
    if (data.error) {
      switch (data.error.code) {
        case 0:
          throw new ServerError(data.error.message);
        case 1:
          throw new ClientError(data.error.message);
        default:
          throw new Error(`Необработанная ошибка! ${data.error.message}`);
      }
    }
    console.log(url, data);
    return data.data;
  }
}

export default new Api();
