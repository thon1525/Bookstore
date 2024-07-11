"use client";

import { viewBookType } from "@/@types/BookType";
import React from "react";
import { CardTeachers } from "./Card";

interface BookstoreListCardsProps {
  data: viewBookType[];
}

const BookstoreListCards: React.FC<BookstoreListCardsProps> = ({
  data = [],
}) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex justify-center lg:justify-between flex-wrap gap-4">
        {data.map((teacher: viewBookType, index: number) => (
          <CardTeachers key={index} items={teacher} />
        ))}
      </div>
    </div>
  );
};

export { BookstoreListCards };
