async function addBookContent(bookID, contentType, contentData) {
  try {
    const response = await fetch("/api/add/addContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookID,
        contentType,
        contentData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "An error occurred while adding content."
      );
    }

    const data = await response.json();
    console.log("Content added successfully:", data);
  } catch (error) {
    console.error("Error adding content:", error.message);
  }
}

export default addBookContent;
