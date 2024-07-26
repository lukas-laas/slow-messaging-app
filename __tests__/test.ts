import { multiplyByTwo } from "../src/utils";
import { expect, test } from "vitest";

test("Multiplications should work", () => {
  expect(multiplyByTwo(4)).toBe(8);
});
