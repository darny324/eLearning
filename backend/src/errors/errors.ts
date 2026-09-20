class Errors {

  status: number;
  message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

class ClientError extends Errors {
  constructor(status: number, message: string) {
    super(status, "CLIENT ERROR:" + message);
  }
}

class InvalidInputError extends ClientError {

  constructor(message: string | null) {
    const m: string = message || "Invalid Input";
    super(400, m);
  }
}

class AuthenticationError extends ClientError {
  constructor(message: string | null) {
    const m: string = message || "AuthenticationError:You must authorized first";
    super(401, m);
  }
}

class NotFoundError extends ClientError {
  constructor(message: string | null) {
    const m: string = message || "The site you are trying access does not exist";
    super(404, m);
  }
}

class ServerError extends Errors {
  constructor(status: number, message: string) {
    super(status, "SERVER ERROR:" + message);
  }
}

class InternalServerError extends ServerError {
  constructor(message: string | null) {
    const m: string = message || "Internal Server Error";
    super(500, m);
  }
}

class NotImplementedError extends ServerError {
  constructor(message: string | null) {
    const m: string = message || "The Request Method has not been implemented";
    super(501, m);
  }
}

export {
  Errors, ClientError, ServerError, NotFoundError, AuthenticationError,
  InvalidInputError, InternalServerError, NotImplementedError
}
