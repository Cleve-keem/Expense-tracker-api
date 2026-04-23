export class AuthError extends Error {
  constructor(
    public statusCode: number = 401,
    public message: string,
  ) {
    super(message);
    this.name = "AuthError";
    this.statusCode = statusCode;
  }
}
