import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  subtitle: String,
  author: String,
  genre: String,
  tag: [String],
  cover: String,
  coverpath: String,
  slug: String,
  relativefactor: Number,
  bookID: mongoose.Schema.Types.ObjectId,
});

const Books =
  mongoose.models.Books || new mongoose.model("Books", BooksSchema, "books");

export default Books;
