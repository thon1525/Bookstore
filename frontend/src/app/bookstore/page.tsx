// pages/book.tsx
import { GetServerSideProps } from "next";
import React from "react";

type Book = {
  title: string;
  author: string;
  description: string;
};

type BookProps = {
  book: Book;
};

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/v1/auth/view-book");
  const book: Book = await res.json();

  return {
    props: {
      book,
    },
  };
};

export default Book;
