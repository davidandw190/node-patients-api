/**
 * Represents an HTTP response.
 */
class HttpResponse {
  constructor(
    public readonly statusCode: number,
	  public readonly httpStatus: string,
    public readonly message: string,
    public readonly data?: any
  ) {
		this.timeStamp = new Date().toLocaleString();
	}

	timeStamp: string;
}

export default HttpResponse;