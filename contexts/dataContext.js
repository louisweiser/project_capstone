import { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const useBooks = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    async function fetchBookData() {
      const response = await fetch("/api/get/books");
      const data = await response.json();
      setBookData(data);
    }
    async function fetchContentData() {
      const response = await fetch("/api/get/bookcontent");
      const data = await response.json();
      setContentData(data);
    }

    fetchBookData();
    fetchContentData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        bookData,
        setBookData,
        contentData,
        setContentData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

/* ---------------- implementation ----------------
import { useContext } from "react";
import { DataContext } from "@/contexts/dataContext.js";

const { bookData } = useContext(DataContext);

*/
