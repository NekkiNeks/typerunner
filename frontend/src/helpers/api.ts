interface iResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

import config from "../config";

class Api {
  private token = localStorage.getItem("token");

  public async get<T = any>(url: string) {
    const headers = new Headers();
    if (this.token) headers.append("Authorization", `Bearer ${this.token}`);
    headers.append("Content-Type", "Application/json");
    try {
      const response = await fetch(config.backendUrl + url, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok)
        throw new Error(
          `Ошибка при запросе к серверу. Статус: ${response.status}`
        );
      const data = (await response.json()) as iResponse<T>;
      return data;
    } catch (err) {
      throw err;
    }
  }

  public async post<T = any>(url: string, body: any) {
    try {
      const headers = new Headers();
      if (this.token) headers.append("Authorization", `Bearer ${this.token}`);
      headers.append("Content-Type", "Application/json");
      const response = await fetch(config.backendUrl + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      });
      if (!response.ok)
        throw new Error(
          `Ошибка при запросе к серверу. Статус: ${response.status}`
        );
      const data = (await response.json()) as iResponse<T>;
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new Api();
