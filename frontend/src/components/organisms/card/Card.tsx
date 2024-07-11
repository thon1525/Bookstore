"use client";
import { viewBookType } from "@/@types/BookType";
import { Typography } from "@/components/atoms";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface CardTeacherProps {
  items: viewBookType;
}

const CardTeachers: React.FC<CardTeacherProps> = ({ items }) => {
  const {
    ID,
    USERNAME,
    EMAIL,
    FIRSTNAME,
    LASTNAME,
    NATIONALITY,
    BIO,
    PICTURE,
    TITLE,
    COVER_IMAGE,
    PRICE,
    CATEGORY_NAME,
    DESCRIPTION,
  } = items;
  const fullname = `${FIRSTNAME} ${LASTNAME}`;
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const renderStar = (starType: string) => {
    switch (starType) {
      case "full":
        return (
          <svg
            className="w-3 h-3 text-yellow-300 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      case "half":
        return (
          <svg
            className="w-3 h-3 text-yellow-300 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill="url(#halfGradient)"
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
        );
      case "empty":
      default:
        return (
          <svg
            className="w-3 h-3 text-gray-300 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
    }
  };

  const toggleBio = () => {
    setIsBioExpanded(!BIO);
  };
  return (
    <div className="w-full  lg:w-[49%] flex  justify-evenly sm:justify-around border-[1.5px] px-1 md:px-0  shadow-sm pt-2 pb-1 md:py-3 hover:border-3 hover:border-[#455445] ">
      <div className="flex flex-col items-center gap-1 justify-center md:justify-start w-[100px]  sm:w-[130px] md:w-[140px] lg:w-[120px]">
        <Link
          href={`/teachers/${encodeURIComponent(ID)}`}
          className="flex flex-col items-center gap-1 justify-center md:justify-start w-[100px]  sm:w-[130px] md:w-[140px] lg:w-[120px]"
        >
          <Image
            src={COVER_IMAGE}
            width={600}
            height={600}
            alt={`${FIRSTNAME} ${LASTNAME}`}
            className="w-full h-[100px] sm:h-[110px] md:h-[200px] lg:h-[120px] object-cover"
          ></Image>
        </Link>
        <p>{TITLE}</p>
      </div>

      <div className="w-[65%] grid  gap-[2px]">
        {/* Name */}
        <div className="flex justify-between gap-14 items-center lg:gap-0">
          <Typography className="font-medium text-md sm:text-xl tracking-normal">
            {fullname}
          </Typography>
          <div className="flex items-center">{USERNAME}</div>
        </div>

        {/* Stars */}

        <div className="w-full md:w-[75%] flex  items-center ">
          {/* ot ton mean data */}
          {/* <Typography className="text-xs ">{rateStars}</Typography> */}
        </div>

        {/* active Students */}

        <div className="">
          <div className="flex items-center"></div>
          <div className="flex items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2259_2319)">
                <path
                  d="M1 0.3125V1.25H11.3125V8.75H4.75V9.6875H13.1875V8.75H12.25V0.3125H1ZM2.87594 1.71875C2.3791 1.72048 1.9031 1.91855 1.55169 2.26978C1.20028 2.62101 1.00198 3.09692 1 3.59375C1 4.62453 1.84562 5.46875 2.87594 5.46875C3.37252 5.46677 3.84819 5.26857 4.19925 4.91734C4.5503 4.5661 4.74827 4.09034 4.75 3.59375C4.75 2.56391 3.90531 1.71875 2.87594 1.71875ZM5.6875 2.1875V3.125H8.03125V2.1875H5.6875ZM8.96875 2.1875V3.125H10.375V2.1875H8.96875ZM2.87594 2.65625C3.39812 2.65625 3.8125 3.07016 3.8125 3.59375C3.8125 4.11875 3.39859 4.53125 2.87594 4.53125C2.35094 4.53125 1.9375 4.11875 1.9375 3.59375C1.9375 3.07016 2.35141 2.65625 2.87594 2.65625ZM5.6875 4.0625V5H10.375V4.0625H5.6875ZM1 5.9375V9.6875H1.9375V6.875H3.34375V9.6875H4.28125V7.18344L5.24875 7.69531C5.52297 7.84062 5.8525 7.84016 6.12625 7.69531L7.78094 6.82109L7.34359 5.99141L5.68844 6.86656L4.23719 6.10063C4.03465 5.99362 3.80907 5.93763 3.58 5.9375H1Z"
                  fill="#455445"
                />
              </g>
              <defs>
                <clipPath id="clip0_2259_2319">
                  <rect
                    width="14.1875"
                    height="9.375"
                    fill="white"
                    transform="translate(0 0.3125)"
                  />
                </clipPath>
              </defs>
            </svg>

            <Typography className="text-xs ml-1" align="left">
              {TITLE}
            </Typography>
          </div>
        </div>

        {/* Description */}

        <article className="w-full h-auto text-wrap text-xs text-[#455445]">
          {isBioExpanded ? BIO : `${BIO.substring(0, 70)}...`}
          <span>
            <button
              onClick={toggleBio}
              className="hidden md:block text-xs text-gray-900 font-medium underline "
            >
              {isBioExpanded ? "See less" : "Read more"}
            </button>
          </span>
        </article>

        {/* pricing */}

        <Typography
          className="tracking-wide hover:underline"
          fontSize="sm"
          align="left"
          variant="semibold"
        >
          ${PRICE}
        </Typography>
      </div>
    </div>
  );
};

export { CardTeachers };
