export {};

interface CustomMatchers<R = unknown> {
  toBeDomainError(expected: { code: number; message: string }): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
