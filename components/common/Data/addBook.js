export async function createBookContent(bookID) {
  try {
    const response = await fetch("/api/add/addbookcontent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookID }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Buch erfolgreich in die Datenbank hinzugefügt.");
      console.log("Datenbank wird mit den lokalen Daten synchronsisiert...");
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(
      "Fehler beim Hinzufügen des Buchinhalts in die Datenbank:",
      error
    );
  }
}

export default async function addBook(bookData) {
  try {
    const response = await fetch("/api/add/addbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    const data = await response.json();
    if (response.ok) {
      createBookContent(data.newBook.bookID);
    } else {
      console.error(
        "Fehler beim Hinzufügen des Buche in die Datenbank:",
        data.message
      );
    }
  } catch (error) {
    console.error(
      "Netzwerkfehler beim Hinzufügen des Buches in die Datenbank:",
      error
    );
  }
}
