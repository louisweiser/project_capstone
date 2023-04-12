import { createContext, useState } from "react";
import { useEffect } from "react";
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  const [currentbook, setCurrentbook] = useState("dieunendlichegeschichte");
  const [theme, setTheme] = useState("quotes");
  const [chooseCurrentBook, setChooseCurrentBook] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(Math.floor(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);

    setScreenWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MyContext.Provider
      value={{
        screenWidth,
        setScreenWidth,
        input1,
        setInput1,
        input2,
        setInput2,
        input3,
        setInput3,
        currentbook,
        setCurrentbook,
        theme,
        setTheme,
        chooseCurrentBook,
        setChooseCurrentBook,
        searchTerm,
        setSearchTerm,
        edit,
        setEdit,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
