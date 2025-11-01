import { useEffect, useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";
import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";
import { useVisualStore } from "../stores/visualStore";

import MediaItemProps from "./props/MediaItemProps";
import MediaCredits from "./props/MediaCredits";
import MediaCrew from "./props/MediaCrew";
import Writers from "./props/Writers";
import SliderProps from "./props/SliderProps";

import { FaBackward } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import SliderComp from "./SliderComp";
import { getMovieCredits } from "../utils/tmdbApi";
import { useApiErrorHandler } from "../hooks/useApiErrorHandler";

// Actor image component with fallback handling - defined outside MediaItem to prevent state resets
const ActorImage = ({
  actor,
  sliderValue,
}: {
  actor: any;
  sliderValue: number;
}) => {
  const [imageError, setImageError] = useState(false);
  const hasValidProfile =
    actor.profile_path && actor.profile_path.trim() !== "";
  const imageSrc = hasValidProfile
    ? `https://www.themoviedb.org/t/p/w220_and_h330_face${actor.profile_path}`
    : null;

  const handleImageError = () => {
    setImageError(true);
  };

  const size = parseInt(SliderProps[sliderValue]["width"]);

  if (imageSrc && !imageError) {
    return (
      <Image
        className="rounded-full shadow-xl"
        src={imageSrc}
        alt={actor.name}
        width={size}
        height={size}
        loading="lazy"
        quality={75}
        onError={handleImageError}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600"
      style={{ width: size, height: size }}
    >
      <BsImage className="text-gray-400 text-2xl" />
    </div>
  );
};

function MediaItem() {
  const setMediaItemActive = useMediaStore((state) => state.setMediaItemActive);
  const menuSize = useUiStore((state) => state.menuSize);
  const setMenuSize = useUiStore((state) => state.setMenuSize);
  const castVisible = useMediaStore((state) => state.castVisible);
  const setCastVisible = useMediaStore((state) => state.setCastVisible);
  const setBackgroundImageUrl = useVisualStore(
    (state) => state.setBackgroundImageUrl
  );
  const setImageVisible = useVisualStore((state) => state.setImageVisible);
  const sliderValue = useVisualStore((state) => state.sliderValue);
  const setSliderValue = useVisualStore((state) => state.setSliderValue);
  const backgroundOpacity = useVisualStore((state) => state.backgroundOpacity);
  const setBackgroundOpacity = useVisualStore(
    (state) => state.setBackgroundOpacity
  );
  const [crew, setCrew] = useState(false);
  const { handleApiError } = useApiErrorHandler();

  useEffect(() => {
    getMediaDetails();
    setMenuSize(menuSize);
    setBackgroundImageUrl(MediaItemProps.backdrop_path || "");
    setImageVisible(true);
    setTimeout(() => {
      setCastVisible(true);
      setCrew(true);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMediaDetails = async () => {
    if (MediaItemProps.tmdbId) {
      try {
        const mediaData = await getMovieCredits(MediaItemProps.tmdbId);
        mediaData.cast?.map((cast: any) => {
          MediaCredits.push({
            key: cast.order,
            name: cast.name,
            character: cast.character,
            profile_path: cast.profile_path,
            dep: cast.known_for_department,
          });
        });
        mediaData.crew?.map((crew: any) => {
          if (crew.job === "Director") {
            MediaCrew.push({
              key: crew.id,
              name: crew.name,
              dep: crew.job,
            });
          }
          if (crew.job === "Writer") {
            Writers.push({
              key: crew.id,
              name: crew.name,
              dep: crew.job,
            });
          }
        });
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  const handleClose = () => {
    setMediaItemActive(false);
    Object.keys(MediaItemProps).forEach((key) => {
      delete (MediaItemProps as any)[key];
    });
    MediaCredits.length = 0;
    MediaCrew.length = 0;
    Writers.length = 0;
    setCastVisible(false);
    setBackgroundImageUrl("");
    setImageVisible(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between pr-4">
        <button className="pt-3" onClick={handleClose}>
          <FaBackward className="text-[#CC7B19] hover:text-gray-700 p-1 hover:bg-[#CC7B19] rounded-full text-3xl" />
        </button>
        {crew && (
          <div>
            <SliderComp
              defaultValue={sliderValue}
              step={25}
              min={0}
              max={100}
              onChange={(value) =>
                setSliderValue(typeof value === "number" ? value : value[0])
              }
            />
            <SliderComp
              defaultValue={backgroundOpacity}
              step={1}
              min={1}
              max={10}
              onClick={() => setCastVisible(!castVisible)}
              onChange={(value) =>
                setBackgroundOpacity(
                  typeof value === "number" ? value : value[0]
                )
              }
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-start pt-4 overflow-y-scroll h-[75vh] scrollbar-hide object-contain">
        <div className="items-center lg:flex lg:space-x-8">
          <ReactPlayer
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  volume: 1,
                  controls: true,
                  color: "#fff",
                },
              },
            }}
            url={MediaItemProps.ObjUrl}
            controls
            pip={true}
            width="640px"
            height="400px"
          />
          <div className="lg:max-w-[40vw] space-y-4">
            <div className="text-3xl text-gray-100">
              {MediaItemProps.tmdbTitle}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-200">
                {MediaItemProps.tmdbReleaseDate}
              </div>
              <div className="text-gray-200">TODO movie length</div>
            </div>
            <div className="text-gray-200">{MediaItemProps.tmdbOverview}</div>
            {/* movie info */}
            {crew && (
              <div className="flex space-x-4">
                <div className="font-semibold text-gray-400">
                  <p>DIRECTED BY</p>
                  <p>WRITTEN BY</p>
                  <p>STUDIO</p>
                  <p>GENRE</p>
                </div>
                <div className="text-gray-200">
                  <div>
                    <div className="flex items-start space-x-1">
                      {MediaCrew.length > 0 ? (
                        MediaCrew.slice(0, 3).map((crew) => {
                          return (
                            <p className="" key={crew.key}>
                              {crew.name}
                              <br />
                            </p>
                          );
                        })
                      ) : (
                        <p className="text-gray-400">Unknown Director</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start space-x-1">
                      {Writers.length > 0 ? (
                        Writers.slice(0, 3).map((writer) => {
                          return (
                            <p className="" key={writer.key}>
                              {writer.name}
                              <br />
                            </p>
                          );
                        })
                      ) : (
                        <p className="text-gray-400">Unknown Writers</p>
                      )}
                    </div>
                  </div>
                  <p>{MediaItemProps.tmdbProduction} TODO</p>
                  <p>{MediaItemProps.tmdbGenre} TODO</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {castVisible && (
          // casting
          <div className="pt-8">
            <div className="text-gray-200">Cast</div>
            <div
              className={`flex items-start overflow-hidden overflow-x-scroll scrollbar-hide object-contain space-x-10 pt-4 ${
                menuSize
                  ? "max-w-[79vw] xl:max-w-[92vw] 2xl:max-w-[92vw]"
                  : "max-w-[77vw] xl:max-w-[83vw] 2xl:max-w-[85vw]"
              }`}
            >
              {MediaCredits.map((actor) => (
                <div
                  className="flex flex-col items-center justify-center space-x-1 text-xs rounded-full border-1"
                  key={actor.key}
                >
                  <div className="flex items-center justify-center p-[2px] bg-gray-800 hover:bg-[#CC7B19] rounded-full ">
                    <ActorImage actor={actor} sliderValue={sliderValue} />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center w-[100px] pt-1">
                    <div className="text-gray-200">{actor.name}</div>
                    <div className="text-gray-400">{actor.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaItem;
