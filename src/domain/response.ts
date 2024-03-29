import { Code } from '../enum/http-code.enum';
import { Status } from '../enum/http-status.enum';

/**
 * Represents an HTTP response.
 */
export class HttpResponse<T> {
  private timeStamp: string;
  constructor(
    private statusCode: Code,
    private httpStatus: Status,
    private message: string,
    private data?: T
  ) {
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}
