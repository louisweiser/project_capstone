import React, { useState, useEffect, useContext, useRef } from "react";
import styled, { css } from "styled-components";

import { DataContext } from "@/contexts/dataContext.js";

import addBook from "@/components/common/Data/addBook.js";

import { genreData } from "@/public/data/genre.js";
//neu
const sharedStyles = css`
  /*layout*/
  display: block;
  text-align: center;
  /*dimension*/
  width: calc(100vw - 10px);
  margin: 10px 5px 0px 5px;
  padding: 7px;
  /*style*/
  background-color: #03314b;
  border: none;
  border-bottom: solid 1px #fffefb;
  outline: none;
`;

const StyledForm = styled.form`
  /*layout*/
  display: flex;
  flex-direction: column;
`;

const StyledInputField = styled.input`
  ${sharedStyles}
`;

const StyledSelectField = styled.select`
  ${sharedStyles}
`;

const StyledFileContainerField = styled.div`
  ${sharedStyles}
`;

const StyledFileInput = styled.input`
  /*layout*/
  display: none;
`;

const StyledFileButton = styled.button`
  /*dimension*/
  width: 100%;
`;

const StyledSubmitButton = styled.button`
  /*layout*/
  display: block;
  text-align: center;
  /*dimension*/
  width: calc(100vw - 10px);
  margin: 30px 5px 0px 5px;
  padding: 7px;
  /*style*/
  background-color: #03314b;
  border: none;
  border: solid 1px #fffefb;
  outline: none;
  &:hover {
    background-color: black;
  }
`;

export default function FormForNewBook() {
  const { setBookData, setContentData } = useContext(DataContext);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [cover, setCover] = useState(null);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const [fileValid, setFileValid] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({
    width: null,
    height: null,
  });

  const fileInputRef = useRef();

  useEffect(() => {
    if (imageDimensions.height && imageDimensions.width) {
      const relativFactor = imageDimensions.width / imageDimensions.height;

      if (relativFactor) {
        if (relativFactor > 0.5 && relativFactor < 0.9) {
          const slug =
            title.replace(/\s+/g, "").toLowerCase() +
            subtitle.replace(/\s+/g, "").toLowerCase();

          const newBookData = {
            title: title,
            subtitle: subtitle,
            author: author,
            genre: genre,
            tag: [],
            cover: cover.name,
            coverpath: `/images/cover/${cover.name}`,
            slug: slug,
            relativefactor: relativFactor,
          };
          addBook(newBookData);

          async function fetchBookData() {
            const response = await fetch("/api/get/books");
            const data = await response.json();
            setBookData(data);
            if (response.ok) {
              console.log("Buch geladen");
            }
          }
          async function fetchContentData() {
            const response = await fetch("/api/get/bookcontent");
            const data = await response.json();
            setContentData(data);
            if (response.ok) {
              console.log("Content geladen");
            }
          }
          setTimeout(() => {
            fetchBookData();
            fetchContentData();
          }, 3000);

          setImageDimensions({
            width: null,
            height: null,
          });
          setTitle("");
          setSubtitle("");
          setCover(null);
          setGenre("");
          setAuthor("");
          setFileValid(true);
        } else {
          console.log(
            "Das Bildformat ist ungünstig für ein Cover. Bitte wähle ein anderes."
          );
        }
      }
    }
  }, [imageDimensions]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fileValid && cover && title !== "" && genre !== "" && author !== "") {
      const reader = new FileReader();
      reader.readAsDataURL(cover);
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cover: base64Data, fileName: cover.name }),
        });

        if (response.ok) {
          console.log(
            "Bilddatei erfolgreich gespeichert. Dimensionen werden ermittelt..."
          );

          async function fetchImageSize() {
            const response = await fetch(`/api/image-size?id=${cover.name}`);
            const data = await response.json();
            setImageDimensions(data);

            if (response.ok) {
              console.log("Dimensionen wurden erfolgreich ermittelt.", data);
            } else {
              console.log("Fehler beim ermitteln der Dimensionen!");
            }
          }

          fetchImageSize();
        } else {
          console.error("Fehler beim Speichern der Bilddatei!");
        }
      };
    } else {
      console.log("Einhabe ungültig!");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="title">
        <StyledInputField
          placeholder="Title"
          type="text"
          id="title"
          maxLength="50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label htmlFor="subtitle">
        <StyledInputField
          placeholder="Subtitle"
          type="text"
          id="subtitle"
          maxLength="50"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </label>
      <label htmlFor="author">
        <StyledInputField
          placeholder="Author"
          type="text"
          id="author"
          maxLength="50"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>
      <label htmlFor="genre">
        <StyledSelectField
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">Choose Genre</option>
          {genreData.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </StyledSelectField>
      </label>
      <label htmlFor="cover">
        <StyledFileContainerField>
          <StyledFileInput
            type="file"
            ref={fileInputRef}
            required
            onChange={(event) => {
              const file = event.target.files[0];
              const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

              if (
                file &&
                file.size <= 3000000 &&
                allowedTypes.includes(file.type)
              ) {
                setCover(file);
                setFileValid(true);
              } else {
                setFileValid(false);
              }
            }}
          />
          {!fileValid && (
            <p>
              Die Datei ist ungültig. Bitte wähle eine Bilddatei (jpg, png,
              webp) mit einer Größe von maximal 3 MB.
            </p>
          )}
          <StyledFileButton
            type="button"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            {cover ? cover.name : "Import Cover"}
          </StyledFileButton>
        </StyledFileContainerField>
      </label>

      <StyledSubmitButton type="submit">add book</StyledSubmitButton>
    </StyledForm>
  );
}
