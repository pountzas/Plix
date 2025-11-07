"use client";

import { Activity } from "react";
import { useRouter } from "next/navigation";
import { CgHome } from "react-icons/cg";
import { BsFilm } from "react-icons/bs";
import { MdMonitor } from "react-icons/md";
import { AiFillFolderAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";
import { useVisualStore } from "../stores/visualStore";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  removeMovieFromUserCollection,
  removeTvShowFromUserCollection,
} from "../utils/dataPersistence";

function Menu() {
  const router = useRouter();
  const { data: session } = useSession();
  const setModalOpen = useUiStore((state) => state.setModalOpen);
  const menuSize = useUiStore((state) => state.menuSize);
  const persistedMovies = useMediaStore((state) => state.persistedMovies);
  const persistedTvShows = useMediaStore((state) => state.persistedTvShows);
  const removePersistedMovie = useMediaStore(
    (state) => state.removePersistedMovie
  );
  const removePersistedTvShow = useMediaStore(
    (state) => state.removePersistedTvShow
  );
  const imageVisible = useVisualStore((state) => state.imageVisible);

  // Hover state for delete icons
  const [hoveredMovies, setHoveredMovies] = useState<boolean>(false);
  const [hoveredTvShows, setHoveredTvShows] = useState<boolean>(false);

  const menuHome = () => {
    // Navigate to home page
    router.push("/");
  };

  const menuMovie = () => {
    router.push("/movies");
  };

  const menuTv = () => {
    router.push("/tv");
  };

  const deleteAllMovies = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation

    const userId = (session?.user as any)?.uid;
    if (!userId) {
      console.error("No user ID available for deletion");
      return;
    }

    try {
      // Remove from Firebase first
      await Promise.all(
        persistedMovies.map((movie) =>
          removeMovieFromUserCollection(movie.tmdbId, userId)
        )
      );

      // Then remove from local state
      persistedMovies.forEach((movie) => removePersistedMovie(movie.tmdbId));
    } catch (error) {
      console.error("Failed to delete movies from Firebase:", error);
      // Still remove from local state as fallback
      persistedMovies.forEach((movie) => removePersistedMovie(movie.tmdbId));
    }
  };

  const deleteAllTvShows = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation

    const userId = (session?.user as any)?.uid;
    if (!userId) {
      console.error("No user ID available for deletion");
      return;
    }

    try {
      // Remove from Firebase first
      await Promise.all(
        persistedTvShows.map((tvShow) =>
          removeTvShowFromUserCollection(tvShow.tmdbId, userId)
        )
      );

      // Then remove from local state
      persistedTvShows.forEach((tvShow) =>
        removePersistedTvShow(tvShow.tmdbId)
      );
    } catch (error) {
      console.error("Failed to delete TV shows from Firebase:", error);
      // Still remove from local state as fallback
      persistedTvShows.forEach((tvShow) =>
        removePersistedTvShow(tvShow.tmdbId)
      );
    }
  };

  return (
    <section
      className={`relative space-y-5 m-3 rounded-md pt-3 px-3 min-h-[80vh] w-[200px] transition-all ease-in-out delay-200 ${
        imageVisible && "opacity-80"
      } ${
        !menuSize &&
        " bg-gradient-to-b from-[#232B35] to-transparent !space-y-3 min-w-[180px] h-[500px]"
      }  `}
    >
      <div
        onClick={menuHome}
        className="flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl"
      >
        <CgHome className={`text-2xl mr-4 ${!menuSize && "mr-8"}`} />
        <Activity mode={menuSize ? "hidden" : "visible"}>
          <p>Home</p>
        </Activity>
      </div>
      {persistedMovies.length > 0 && (
        <div
          onClick={menuMovie}
          onMouseEnter={() => setHoveredMovies(true)}
          onMouseLeave={() => setHoveredMovies(false)}
          className="flex flex-nowrap cursor-pointer items-center pl-[2px] text-gray-300 text-xl group relative"
        >
          <BsFilm className={` mr-4 ${!menuSize && "mr-8"}`} />
          <Activity mode={menuSize ? "hidden" : "visible"}>
            <p className="whitespace-nowrap">
              Movies{" "}
              <span className="text-gray-500 text-sm">
                ({persistedMovies.length})
              </span>
            </p>
          </Activity>
          <MdDelete
            onClick={deleteAllMovies}
            className={`absolute right-2 text-red-400 hover:text-red-300 cursor-pointer transition-opacity duration-200 ${
              hoveredMovies ? "opacity-100" : "opacity-0"
            } ${menuSize ? "text-lg" : "text-xl"}`}
          />
        </div>
      )}
      {persistedTvShows.length > 0 && (
        <div
          onClick={menuTv}
          onMouseEnter={() => setHoveredTvShows(true)}
          onMouseLeave={() => setHoveredTvShows(false)}
          className="flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl group relative"
        >
          <MdMonitor className={`text-2xl mr-4 ${!menuSize && "mr-8"}`} />
          <Activity mode={menuSize ? "hidden" : "visible"}>
            <p>
              TV Shows{" "}
              <span className="text-gray-500 text-sm">
                ({persistedTvShows.length})
              </span>
            </p>
          </Activity>
          <MdDelete
            onClick={deleteAllTvShows}
            className={`absolute right-2 text-red-400 hover:text-red-300 cursor-pointer transition-opacity duration-200 ${
              hoveredTvShows ? "opacity-100" : "opacity-0"
            } ${menuSize ? "text-lg" : "text-xl"}`}
          />
        </div>
      )}

      {/* Music menu - for future implementation */}
      {/* {persistedMusic.length > 0 && (
        <div
          onClick={menuMusic}
          className="flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl"
        >
          <MdMusicNote className={`text-2xl mr-4 ${!menuSize && "mr-8"}`} />
          <Activity mode={menuSize ? "hidden" : "visible"}>
            <p>Music{" "}
              <span className="text-gray-500 text-sm">
                ({persistedMusic.length})
              </span>
            </p>
          </Activity>
        </div>
      )} */}

      <div
        onClick={() => setModalOpen(true)}
        className="flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl"
      >
        <AiFillFolderAdd className={` mr-4 ${!menuSize && "mr-8"}`} />
        <Activity mode={menuSize ? "hidden" : "visible"}>
          <p>Add Media</p>
        </Activity>
      </div>
    </section>
  );
}

export default Menu;
