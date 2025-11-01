import Image from "next/image";
// @ts-ignore - MediaItemProps is a global state object
import MediaItemProps from "./props/MediaItemProps";
import { useMediaStore } from "../stores/mediaStore";
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
  id,
  name,
  tmdbId,
  adult,
  backdrop_path,
  lang,
  popularity,
  voteAverage,
  voteCount,
  tmdbPoster,
  tmdbTitle,
  tmdbOverview,
  tmdbReleaseDate,
  tmdbRating,
  tmdbGenre,
  fileName,
  ObjUrl,
  folderPath,
  folderPath2,
  rootPath,
}: MediaCardProps) {
  const setMediaItemActive = useMediaStore((state) => state.setMediaItemActive);
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

  const sendMediaValue = () => {
    Object.assign(MediaItemProps, {
      id,
      name,
      tmdbId,
      adult,
      backdrop_path,
      lang,
      popularity,
      voteAverage,
      voteCount,
      tmdbPoster,
      tmdbTitle,
      tmdbOverview,
      tmdbReleaseDate,
      tmdbRating,
      tmdbGenre,
      fileName,
      ObjUrl,
      folderPath,
      folderPath2,
      rootPath,
    });
  };

  const handleMediaCardClick = () => {
    sendMediaValue();
    setMediaItemActive(true);
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
