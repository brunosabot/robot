export enum ErrorCode {
  BAD_REQUEST = 400,
  FORRBIDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export default class DomainError extends Error {
  constructor(
    message: string,
    readonly code: ErrorCode,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}
