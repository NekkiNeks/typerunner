export class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientError";
  }
}

export class ServerError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "ServerError";
  }
}
