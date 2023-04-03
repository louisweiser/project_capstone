import dbConnect from "@/db/connect";
import BookContent from "@/db/models/bookcontent.js";

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
    const bookContents = await BookContent.find();
    return response.status(200).json(bookContents);
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Error fetching books from the database." });
  }
}
