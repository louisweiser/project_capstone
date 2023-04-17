import searchBooks from "./index.js";

const books = [
  {
    title: "JavaScript for Beginners",
    subtitle: "Learn JavaScript in 30 Days",
    author: "John Doe",
    genre: "Programming",
    tag: ["javascript", "programming", "beginners"],
  },
  {
    title: "React and Redux",
    subtitle: "Build Modern Web Applications",
    author: "Jane Smith",
    genre: "Programming",
    tag: ["react", "redux", "web development"],
  },
  {
    title: "Great Expectations",
    author: "Charles Dickens",
    genre: "Classic",
    tag: ["fiction", "classic", "literature"],
  },
];

describe("searchBooks", () => {
  test("returns books that match search term in title", () => {
    const searchTerm = "JavaScript";
    const expectedResults = [books[0]];
    const results = searchBooks(searchTerm, books);
    expect(results).toEqual(expectedResults);
  });

  test("returns books that match search term in subtitle", () => {
    const searchTerm = "30 Days";
    const expectedResults = [books[0]];
    const results = searchBooks(searchTerm, books);
    expect(results).toEqual(expectedResults);
  });

  test("returns books that match search term in author", () => {
    const searchTerm = "Doe";
    const expectedResults = [books[0]];
    const results = searchBooks(searchTerm, books);
    expect(results).toEqual(expectedResults);
  });

  test("returns books that match search term in genre", () => {
    const searchTerm = "Classic";
    const expectedResults = [books[2]];
    const results = searchBooks(searchTerm, books);
    expect(results).toEqual(expectedResults);
  });

  test("returns books that match search term in tag", () => {
    const searchTerm = "literature";
    const expectedResults = [books[2]];
    const results = searchBooks(searchTerm, books);
    expect(results).toEqual(expectedResults);
  });

  test("returns empty array if no match is found", () => {
    const searchTerm = "Non-existent Book";
    const expectedResults = [];
    const results = searchBooks(searchTerm, books);
    expect(results).toEqual(expectedResults);
  });

  test("search term is case insensitive", () => {
    const searchTerm = "jAvaScript";
    const expectedResults = [books[0]];
    const results = searchBooks(searchTerm, books);
    expect(results).toEqual(expectedResults);
  });
});
