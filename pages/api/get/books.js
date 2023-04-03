import dbConnect from "@/db/connect";
import Books from "@/db/models/books.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed. Use GET." });
  }

  try {
    await dbConnect();
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Error connecting to the database." });
  }

  try {
    const books = await Books.find();
    return response.status(200).json(books);
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Error fetching books from the database." });
  }
}
