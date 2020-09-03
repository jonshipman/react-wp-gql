import * as tests from ".";
import "./scss/style.scss";

Object.keys(tests).forEach((key) => {
  describe(key, () => {
    it("is truthy", () => {
      expect(tests[key]).toBeTruthy();
    });
  });
});
