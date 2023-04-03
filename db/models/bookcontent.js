import mongoose from "mongoose";

const BookContentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookID: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
  stories: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  quotes: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  summary: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
});

const BookContent =
  mongoose.models.BookContent ||
  new mongoose.model("BookContent", BookContentSchema, "bookcontent");

export default BookContent;
