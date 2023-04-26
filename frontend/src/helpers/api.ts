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

async function get<T = any>(url: string): Promise<T> {
  console.log(import.meta.env.VITE_BACKEND_ADDRESS);
  const headers = new Headers();
  const token = localStorage.getItem("token");
  if (token) headers.append("authorization", `Bearer ${token}`);
  headers.append("Content-Type", "Application/json");

  const response = await fetch(import.meta.env.VITE_BACKEND_ADDRESS + url, {
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

async function post<T = any>(url: string, body: any): Promise<T> {
  const headers = new Headers();
  const token = localStorage.getItem("token");
  if (token) headers.append("authorization", `Bearer ${token}`);
  headers.append("Content-Type", "Application/json");

  const response = await fetch(import.meta.env.VITE_BACKEND_ADDRESS + url, {
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

export default {
  get,
  post,
};
