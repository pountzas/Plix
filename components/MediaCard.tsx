"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// @ts-ignore - MediaItemProps is a global state object
import MediaItemProps from "./props/MediaItemProps";
import { useVisualStore } from "../stores/visualStore";
import { useState } from "react";

import {
  BsPlayCircleFill,
  BsFillPencilFill,
  BsCircle,
  BsImage,
} from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import SliderProps from "./props/SliderProps";

interface MediaCardProps {
  id: number;
  name: string;
  tmdbId: number;
  mediaType: "movie" | "tv";
  adult?: boolean;
  backdrop_path: string;
  lang: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  tmdbPoster: string;
  tmdbTitle: string;
  tmdbOverview: string;
  tmdbReleaseDate: string;
  tmdbRating: number;
  tmdbGenre: string[];
  fileName: string;
  ObjUrl: string;
  folderPath: string;
  folderPath2: string;
  rootPath: string;
}

function MediaCard({
  id: _id,
  name: _name,
  tmdbId,
  mediaType,
  adult: _adult,
  backdrop_path: _backdrop_path,
  lang: _lang,
  popularity: _popularity,
  voteAverage: _voteAverage,
  voteCount: _voteCount,
  tmdbPoster,
  tmdbTitle,
  tmdbOverview: _tmdbOverview,
  tmdbReleaseDate,
  tmdbRating: _tmdbRating,
  tmdbGenre: _tmdbGenre,
  fileName: _fileName,
  ObjUrl: _ObjUrl,
  folderPath: _folderPath,
  folderPath2: _folderPath2,
  rootPath: _rootPath,
}: MediaCardProps) {
  const router = useRouter();
  const sliderValue = useVisualStore((state) => state.sliderValue);

  // Image fallback state
  const [imageError, setImageError] = useState(false);

  // Check if we have a valid poster path
  const hasValidPoster = tmdbPoster && tmdbPoster.trim() !== "";
  const imageSrc = hasValidPoster
    ? `https://www.themoviedb.org/t/p/w220_and_h330_face${tmdbPoster}`
    : null;

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  const handlePlayer = () => {};

  const handleMediaCardClick = () => {
    // Navigate to dynamic media detail page with additional data
    if (!mediaType || !tmdbId || !["movie", "tv"].includes(mediaType)) {
      console.error("Invalid navigation parameters:", { mediaType, tmdbId });
      return;
    }

    const params = new URLSearchParams({
      fileName: _fileName || "",
      folderPath: _folderPath || "",
      rootPath: _rootPath || "",
    });
    const url = `/${mediaType}/${tmdbId}?${params.toString()}`;
    router.push(url);
  };

  const press = () => {};

  // Fallback UI for when image is not available or fails to load
  const ImageFallback = () => {
    const height = parseInt(SliderProps[sliderValue]["height"]);
    const width = parseInt(SliderProps[sliderValue]["width"]);

    return (
      <div
        className="rounded-md bg-gray-800 flex items-center justify-center border-2 border-gray-700"
        style={{ height, width }}
      >
        <BsImage className="text-gray-500 text-4xl opacity-50" />
      </div>
    );
  };

  return (
    <div onClick={handleMediaCardClick} className="min-w-max">
      <div className="pb-2 group">
        <div className="text-5xl">
          <div
            className="opacity-0 group-hover:opacity-100 flex shadow-sm"
            onClick={handlePlayer}
          >
            <BsPlayCircleFill
              onClick={press}
              className={`${SliderProps[sliderValue]["play"]} relative transition-all z-10 p-[1px] text-gray-900 opacity-80 bg-gray-300 hover:opacity-100 hover:p-0 hover:text-[#CC7B19] hover:bg-gray-900 rounded-full`}
            />
            <HiDotsVertical
              onClick={press}
              className={`${SliderProps[sliderValue]["options"]} hover:text-[#CC7B19] relative z-10 text-gray-300`}
            />
            <BsFillPencilFill
              onClick={press}
              className={`${SliderProps[sliderValue]["edit"]} hover:text-[#CC7B19] relative z-10 text-gray-30`}
            />
            <BsCircle
              onClick={press}
              className={`${SliderProps[sliderValue]["later"]} hover:text-[#CC7B19] relative z-10 text-gray-300`}
            />
          </div>
        </div>
        <div className={`outline-[#CC7B19] group-hover:outline rounded-md`}>
          {imageSrc && !imageError ? (
            <Image
              className="rounded-md"
              src={imageSrc}
              alt={`${tmdbTitle} poster`}
              loading="lazy"
              height={parseInt(SliderProps[sliderValue]["height"])}
              width={parseInt(SliderProps[sliderValue]["width"])}
              onError={handleImageError}
            />
          ) : (
            <ImageFallback />
          )}
        </div>
      </div>
      <h3
        className={`cursor-pointer font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis ${SliderProps[sliderValue]["title"]}`}
      >
        {tmdbTitle}
      </h3>
      <h3 className="cursor-pointer text-sm text-gray-400 font-semibold">
        {tmdbReleaseDate}
      </h3>
    </div>
  );
}

export default MediaCard;
