export default function searchBooks(searchTerm, books) {
  const searchTermLowerCase = searchTerm.toLowerCase();

  return books.filter((book) => {
    const titleMatch =
      book.title && book.title.toLowerCase().includes(searchTermLowerCase);
    const subtitleMatch =
      book.subtitle &&
      book.subtitle.toLowerCase().includes(searchTermLowerCase);
    const authorMatch =
      book.author && book.author.toLowerCase().includes(searchTermLowerCase);
    const genreMatch =
      book.genre && book.genre.toLowerCase().includes(searchTermLowerCase);

    const tagMatch =
      book.tag &&
      book.tag.some((tag) => tag.toLowerCase().includes(searchTermLowerCase));

    return titleMatch || subtitleMatch || authorMatch || genreMatch || tagMatch;
  });
}
