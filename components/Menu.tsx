import { CgHome } from "react-icons/cg";
import { BsFilm } from "react-icons/bs";
import { MdMonitor } from "react-icons/md";
import { AiFillFolderAdd } from "react-icons/ai";
import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";
import { useNavigationStore } from "../stores/navigationStore";
import { useVisualStore } from "../stores/visualStore";

function Menu() {
  const setModalOpen = useUiStore((state) => state.setModalOpen);
  const menuSize = useUiStore((state) => state.menuSize);
  const latestMovie = useMediaStore((state) => state.homeMovieLoaded);
  const latestTv = useMediaStore((state) => state.homeTvLoaded);
  const persistedMovies = useMediaStore((state) => state.persistedMovies);
  const persistedTvShows = useMediaStore((state) => state.persistedTvShows);
  const setHomeMenuActive = useNavigationStore(
    (state) => state.setHomeMenuActive
  );
  const setMovieMenuActive = useNavigationStore(
    (state) => state.setMovieMenuActive
  );
  const setTvMenuActive = useNavigationStore((state) => state.setTvMenuActive);
  const imageVisible = useVisualStore((state) => state.imageVisible);

  const menuHome = () => {
    setHomeMenuActive(true);
    setMovieMenuActive(false);
    setTvMenuActive(false);
  };

  const menuMovie = () => {
    setHomeMenuActive(false);
    setMovieMenuActive(true);
    setTvMenuActive(false);
  };

  const menuTv = () => {
    setHomeMenuActive(false);
    setMovieMenuActive(false);
    setTvMenuActive(true);
  };

  return (
    <section
      className={`relative space-y-5 m-3 rounded-md pt-3 px-3 min-h-[80vh] transition-all ease-in-out delay-200 ${
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
        {!menuSize && <p>Home</p>}
      </div>
      {(latestMovie || persistedMovies.length > 0) && (
        <div
          onClick={menuMovie}
          className="flex flex-nowrap cursor-pointer items-center pl-[2px] text-gray-300 text-xl"
        >
          <BsFilm className={` mr-4 ${!menuSize && "mr-8"}`} />
          {!menuSize && (
            <p className="whitespace-nowrap">
              Movies{" "}
              <span className="text-gray-500 text-sm">
                ({persistedMovies.length})
              </span>
            </p>
          )}
        </div>
      )}
      {(latestTv || persistedTvShows.length > 0) && (
        <div
          onClick={menuTv}
          className="flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl"
        >
          <MdMonitor className={`text-2xl mr-4 ${!menuSize && "mr-8"}`} />
          {!menuSize && <p>TV Shows ({persistedTvShows.length})</p>}
        </div>
      )}

      <div
        onClick={() => setModalOpen(true)}
        className="flex flex-nowrap cursor-pointer items-center text-gray-300 text-xl"
      >
        <AiFillFolderAdd className={` mr-4 ${!menuSize && "mr-8"}`} />
        {!menuSize && <p>Add Media</p>}
      </div>
    </section>
  );
}

export default Menu;
