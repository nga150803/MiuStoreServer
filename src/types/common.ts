export class Response<T> {
  public message: string;
  public statusCode: number;
  public data?: T;

  constructor(message: string, statusCode: number, data?: T) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class ListResponse<T> {
  public message: string;
  public statusCode: number;
  public data?: T[];

  constructor(message: string, statusCode: number, data?: T[]) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
