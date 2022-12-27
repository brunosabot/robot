import DomainError from "../framework/errors/DomainError";

const mismatchResult = (message: string) => ({
  pass: false,
  message: () => message,
});

expect.extend({
  toBeDomainError(received, expected): jest.CustomMatcherResult {
    if (!(received instanceof DomainError)) {
      return mismatchResult("Not a Domain Error");
    }

    if (received.message !== expected.message) {
      return mismatchResult(
        `Recieved message "${received.message}" different from expected "${expected.message}"`
      );
    }

    if (received.code !== expected.code) {
      return mismatchResult(
        `Recieved code "${received.code}" different from expected "${expected.code}"`
      );
    }

    return {
      pass: true,
      message: () => "",
    };
  },
});
