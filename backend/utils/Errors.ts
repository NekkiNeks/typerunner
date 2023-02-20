class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Серверные ошибки
export class ServerError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}

export class DatabaseError extends ServerError {
  constructor(message: string) {
    super(`Ошибка базы данных: ${message}`);
  }
}

// Ошибки на стороне клиента
export class ClientError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationError extends ClientError {
  constructor(message: string) {
    super(`Ошибка валидации: ${message}`);
  }
}

export class AuthError extends ClientError {
  constructor(message: string) {
    super(`Ошибка аутентификации: ${message}`);
  }
}
