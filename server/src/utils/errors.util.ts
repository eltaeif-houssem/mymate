export class CustomError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super();
    this.message = message;
    this.status = status;
  }
}
