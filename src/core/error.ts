export class ServiceError extends Error {
  constructor(message: string, error?: unknown) {
    super(
      message +
        (error && error instanceof Error ? `: ${error.message}` : `: unknown error - ${error}`),
    );

    this.name = 'ServiceError';

    // Set the prototype explicitly to maintain the correct prototype chain,
    // especially important when transpiling to older ES versions (e.g., ES5).
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}
