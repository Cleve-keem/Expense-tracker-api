class UnauthorizedError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
