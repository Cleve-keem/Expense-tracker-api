export class UserAlreadyExistError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = "UserExistError";
  }
}

export class UserNotFoundError extends Error {
  public statusCode: number;
  constructor(public message: string) {
    super(message);
    this.statusCode = 404;
    this.name = "UserNotFoundError";
  }
}

export class InvalidUserPassword extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = "InvalidUserPassword";
  }
}
