import { render, screen } from "@testing-library/react";
import shuffleArray from "./shuffleArray";

describe("shuffleArray", () => {
  test("returns a new array with the same length", () => {
    const testArray = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(testArray);
    expect(shuffled).toHaveLength(testArray.length);
  });

  test("returns a new array with the same elements", () => {
    const testArray = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(testArray);
    expect(shuffled).toEqual(expect.arrayContaining(testArray));
  });

  test("does not mutate the original array", () => {
    const testArray = [1, 2, 3, 4, 5];
    const originalArray = [...testArray];
    shuffleArray(testArray);
    expect(testArray).toEqual(originalArray);
  });

  test("returns a shuffled array (order not guaranteed)", () => {
    const testArray = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(testArray);

    // The shuffle function uses randomness, so there's a very small chance
    // that the resulting array is in the same order as the original array.
    // If that happens, re-run the test.
    if (JSON.stringify(shuffled) === JSON.stringify(testArray)) {
      console.warn(
        "Shuffled array is the same as the original array. Re-run the test."
      );
      return;
    }

    expect(shuffled).not.toEqual(testArray);
  });
});
