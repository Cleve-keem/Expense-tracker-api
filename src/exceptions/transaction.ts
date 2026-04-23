export class IllegalTransactionAmountError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.name = "Illegal Transaction Amount";
    this.statusCode = statusCode;
  }
}

export class TranasactionRecordNotFoundError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    this.name = "Transaction Record Not Found Error";
  }
}
