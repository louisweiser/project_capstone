import dbConnect from "@/db/connect";
import BookContent from "@/db/models/bookcontent.js";

export default async function handler(req, res) {
  const {
    method,
    body: { bookID, contentType, contentData },
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const bookContent = await BookContent.findOne({ bookID });
        if (!bookContent) {
          res
            .status(400)
            .json({ success: false, message: "Book content not found" });
          return;
        }
        const newContentKey = Object.keys(bookContent[contentType]).length;
        const updatedContent = await BookContent.findByIdAndUpdate(
          bookContent._id,
          { $set: { [`${contentType}.${newContentKey}`]: contentData } },
          { new: true }
        );
        res.status(200).json({ success: true, data: updatedContent });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
