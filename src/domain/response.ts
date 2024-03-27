/**
 * Represents an HTTP response.
 */
class HttpResponse<T> {
  constructor(
    public readonly statusCode: number,
	  public readonly httpStatus: string,
    public readonly message: string,
    public readonly data?: T
  ) {
		this.timeStamp = new Date().toLocaleString();
	}

	timeStamp: string;
}

export default HttpResponse;