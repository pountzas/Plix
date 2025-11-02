"use client";

import { Activity } from "react";
import { useRouter } from "next/navigation";
import { CgHome } from "react-icons/cg";
import { BsFilm } from "react-icons/bs";
import { MdMonitor } from "react-icons/md";
import { AiFillFolderAdd } from "react-icons/ai";
import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";
import { useVisualStore } from "../stores/visualStore";

function Menu() {
  const router = useRouter();
  const setModalOpen = useUiStore((state) => state.setModalOpen);
  const menuSize = useUiStore((state) => state.menuSize);
  const persistedMovies = useMediaStore((state) => state.persistedMovies);
  const persistedTvShows = useMediaStore((state) => state.persistedTvShows);
  const imageVisible = useVisualStore((state) => state.imageVisible);

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
          className="flex flex-nowrap cursor-pointer items-center pl-[2px] text-gray-300 text-xl"
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
        </div>
      )}
      {persistedTvShows.length > 0 && (
        <div
          onClick={menuTv}
          className="flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl"
        >
          <MdMonitor className={`text-2xl mr-4 ${!menuSize && "mr-8"}`} />
          <Activity mode={menuSize ? "hidden" : "visible"}>
            <p>TV Shows ({persistedTvShows.length})</p>
          </Activity>
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
            <p>Music ({persistedMusic.length})</p>
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
