import React from "react";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import format_date from "../utils/utils";
import { Startup,Author } from "@/sanity.types";

export type StartupType = Omit<Startup, "author"> & {author?:Author};

const Card = ({ post }:{post : StartupType} ) => {
  const {
    _createdAt,
    views,
    author,
    category,
    image,
    description,
    title,
  } = post;


  return (
    <div className="max-w-xs w-full bg-white border-6 border-black rounded-2xl shadow-md p-4 transition-all  duration-300  hover:shadow-lg hover:bg-pink-50">

 
      {/* Header */}
      <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
        <p>{format_date(_createdAt)}</p>
        <div className="flex items-center gap-1 text-gray-700">
      <EyeIcon className="w-4 h-4" />
      <span>{views}</span>
    </div>
      </div>



      {/* Author + Title */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <Link
            href={`/user/${author?.id}`}
            className="text-sm font-medium text-gray-600"
          >
            {author?.name}
          </Link>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        <Link href={`/user/${author?.id}`}>
          <img
            src={image}
            alt="author"
            className="w-8 h-8 rounded-full object-cover hover:opacity-80 transition"
          />
        </Link>
      </div>



      {/* Description */}
      <p className="text-sm text-gray-600 mb-3">{description}</p>


      {/* Image */}
      <img
        src={image}
        alt="project"
        className="w-full h-40 object-cover rounded-xl mb-6 border-2 border-b"
      />


      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="">
          <Link
            href={`/?query=${category}?`}
            className="hover:underline text-sm font-medium text-gray-700"
          >
            {category}
          </Link>
        </span>
        <Link href={`/startup/${author?._id}`}>
        <button className="px-4 py-1 text-sm font-semibold border border-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition">
          Details
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
