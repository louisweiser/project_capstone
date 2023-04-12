import sizeOf from "image-size";

export default function handler(req, res) {
  const { id } = req.query;
  console.log("name des bildes", id);
  const dimensions = sizeOf(`./public/images/cover/${id}`);
  res.status(200).json(dimensions);
}
