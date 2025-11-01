import { Activity } from "react";
import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";

import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { VscListSelection } from "react-icons/vsc";
import { FaFolderOpen } from "react-icons/fa";
import { BsFilm, BsGearFill } from "react-icons/bs";
import { MdMonitor } from "react-icons/md";
import { HiOutlineMusicNote } from "react-icons/hi";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import MovieFiles from "./props/MovieFiles";
import TvFiles from "./props/TvFiles";
import { searchMovies, searchTvShows } from "../utils/tmdbApi";
import { useApiErrorHandler } from "../hooks/useApiErrorHandler";
import { useMediaPersistence } from "../hooks/useMediaPersistence";

function MediaModal() {
  const { data: session } = useSession();
  const modalOpen = useUiStore((state) => state.modalOpen);
  const setModalOpen = useUiStore((state) => state.setModalOpen);
  const setHomeMovieLoaded = useMediaStore((state) => state.setHomeMovieLoaded);
  const setHomeTvLoaded = useMediaStore((state) => state.setHomeTvLoaded);
  const [typeSection, setTypeSection] = useState(true);
  const [folderLoadSection, setFolderLoadSection] = useState(false);
  const [advancedSection, setAdvancedSection] = useState(false);
  const [movieLibrary, setMovieLibrary] = useState(false);
  const [tvLibrary, setTvLibrary] = useState(false);
  const [musicLibrary, setMusicLibrary] = useState(false);
  const [ok, setOk] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { handleApiError } = useApiErrorHandler();
  const { saveMoviesToCollection, saveTvShowsToCollection, isAuthenticated } =
    useMediaPersistence();

  const folderPickerRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setModalOpen(false);
    setMovieLibrary(false);
    setTvLibrary(false);
    setMusicLibrary(false);
    setTypeSection(true);
    setFolderLoadSection(false);
    setAdvancedSection(false);
  };

  const showLatestMovies = () => {
    setHomeMovieLoaded(true);
    handleClose();
  };

  const showLatestTv = () => {
    setHomeTvLoaded(true);
    handleClose();
  };

  const addFolderUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setIsProcessing(true);
      setIsSaving(false);
      setTotalFiles(files.length);
      setProcessedCount(0);

      // Arrays to collect processed media for batch saving
      const processedMovies: any[] = [];
      const processedTvShows: any[] = [];

      for (let i = 0; i < files.length; i++) {
        setProcessedCount(i + 1);
        // find videos with type
        if (files[i].type.includes("video")) {
          // regex files name without all characters after the year
          const nameMatch = files[i].name.match(
            /^(?!\d\d?[ex]\d\d?)(?:\[(?:[-\w\s]+)*\] )?(.*?)[-_. ]?(?:[\{\(\[]?(?:dvdrip|[-._\b]ita|[-._\b]h264|x264|hdtv|hdtv-lol|web|proper|internal|[-._\b]eng|xvid| cd\d|dvdscr|\w{1,5}rip|divx|\d+p|\d{4}).*?)?\.([\w]{2,3})$/i
          );
          let name = nameMatch?.[1] || "";
          name = name.replace(/\./g, " ");

          if (movieLibrary) {
            if (name) {
              try {
                const data = await searchMovies(name);
                const tmdbId = data?.results[0]?.id;

                if (tmdbId) {
                  const movieFile = {
                    name,
                    id: i,
                    tmdbId,
                    adult: data.results[0].adult,
                    backdrop_path: data.results[0]?.backdrop_path,
                    original_language: data.results[0]?.original_language,
                    popularity: data.results[0]?.popularity,
                    vote_average: data.results[0]?.vote_average,
                    vote_count: data.results[0]?.vote_count,
                    tmdbPoster: data.results[0]?.poster_path,
                    tmdbTitle: data.results[0]?.title,
                    tmdbOverview: data.results[0]?.overview,
                    tmdbReleaseDate: data.results[0]?.release_date.substring(
                      0,
                      4
                    ),
                    tmdbRating: data.results[0]?.vote_average,
                    tmdbGenre: data.results[0]?.genre_ids,
                    fileName: files[i].name,
                    ObjUrl: URL.createObjectURL(files[i]),
                    folderPath: files[i].webkitRelativePath,
                    folderPath2: (files[i] as any).webkitdirectory,
                    rootPath: (files[i] as any).path,
                  };

                  // Add to local array for immediate UI feedback
                  MovieFiles.push(movieFile);
                  // Collect for batch saving to Firebase
                  processedMovies.push(movieFile);
                } else {
                  console.log(
                    name + " not found " + files[i].webkitRelativePath
                  );
                }
              } catch (error) {
                handleApiError(error);
              }
            }
          }

          if (tvLibrary) {
            if (files[i].type.includes("video")) {
              // remove all after episode name
              let name2 = name.match(
                /^(.+?)[-. ]{0,3}s?(\d?\d)[ex](\d\d)[-. ]{0,3}(.*?)[-. ]?(?:.+)?$/gim
              );

              let episodeMatch = files[i].name.match(
                /([Ss]?)([0-9]{1,2})([xXeE\.\-]?)([0-9]{1,2})/
              );

              let nameTv2 = files[i].name.match(
                /^(.+?)[-. ]{0,3}s?(\d?\d)[ex](\d\d)[-. ]{0,3}(.*?)[-. ]?(?:(?=pulcione|eng|ita|\w+Mux|\w+dl|\d+p|XviD|NovaRip).+)?\.([\w]{2,3})$/gim
              );
              // console.log(episode + 'epi');
              // console.log(' tv ' + episode[2]);
              let episode = episodeMatch?.[0] || "";

              console.log(name2 + "test");
              console.log(name + " name ");
              console.log(nameTv2 + " nameTv1 ");

              if (name2) {
                const name2Str = JSON.stringify(name2);
                // JSON.stringify(name);

                console.log(" tv " + episode);

                // toString(name2);
                // toString(episode);
                // console.log(typeof name);

                if (name2Str !== null) {
                  console.log(typeof episode);
                  console.log(typeof name2Str);
                  // name2.replace(episode[0], '');
                  // regex remove non-alphanumeric characters keep spaces]
                  const processedName = name2Str.replace(/[^\w\s]/gi, "");
                  // name2 = name2.replace(/[^a-zA-Z0-9]/g, '');
                  try {
                    const data = await searchTvShows(processedName);
                    const tmdbId = data.results[0]?.id;

                    if (tmdbId) {
                      const tvFile = {
                        name: processedName,
                        episode: episode,
                        id: i,
                        tmdbId,
                        backdrop_path: data.results[0]?.backdrop_path,
                        original_language: data.results[0]?.original_language,
                        popularity: data.results[0]?.popularity,
                        vote_average: data.results[0]?.vote_average,
                        vote_count: data.results[0]?.vote_count,
                        tmdbPoster: data.results[0]?.poster_path,
                        tmdbTitle: data.results[0]?.name,
                        tmdbOverview: data.results[0]?.overview,
                        tmdbReleaseDate: data.results[0]?.first_air_date,
                        tmdbRating: data.results[0]?.vote_average,
                        tmdbGenre: data.results[0]?.genre_ids,
                        fileName: files[i].name,
                        ObjUrl: URL.createObjectURL(files[i]),
                        folderPath: files[i].webkitRelativePath,
                        folderPath2: (files[i] as any).webkitdirectory,
                        rootPath: (files[i] as any).path,
                      };

                      // Add to local array for immediate UI feedback
                      TvFiles.push(tvFile);
                      // Collect for batch saving to Firebase
                      processedTvShows.push(tvFile);
                    }
                  } catch (error) {
                    handleApiError(error);
                  }
                }
              }
            }
          }
        }
      }

      // Save processed media to Firebase if user is authenticated
      if (
        isAuthenticated &&
        (processedMovies.length > 0 || processedTvShows.length > 0)
      ) {
        setIsSaving(true);
        try {
          // Save movies and TV shows in parallel
          const savePromises = [];
          if (processedMovies.length > 0) {
            savePromises.push(saveMoviesToCollection(processedMovies));
          }
          if (processedTvShows.length > 0) {
            savePromises.push(saveTvShowsToCollection(processedTvShows));
          }

          await Promise.all(savePromises);
          console.log(
            `Saved ${processedMovies.length} movies and ${processedTvShows.length} TV shows to collection`
          );

          // Update persisted data in store
          if (processedMovies.length > 0) {
            const { setPersistedMovies, persistedMovies } =
              useMediaStore.getState();
            const updatedMovies = [
              ...persistedMovies,
              ...processedMovies.map((movie) => ({
                ...movie,
                userId: (session?.user as any)?.uid || "",
                addedAt: new Date(),
                lastModified: new Date(),
              })),
            ];
            setPersistedMovies(updatedMovies);
          }

          if (processedTvShows.length > 0) {
            const { setPersistedTvShows, persistedTvShows } =
              useMediaStore.getState();
            const updatedTvShows = [
              ...persistedTvShows,
              ...processedTvShows.map((tvShow) => ({
                ...tvShow,
                userId: (session?.user as any)?.uid || "",
                addedAt: new Date(),
                lastModified: new Date(),
              })),
            ];
            setPersistedTvShows(updatedTvShows);
          }
        } catch (error) {
          console.error("Error saving media to collection:", error);
          // Note: Local arrays already updated, so UI will show the media
          // but user will see a persistence error in the store
        } finally {
          setIsSaving(false);
        }
      }

      setIsProcessing(false);
      setOk(true);
    }
  };

  const handleMovieMedia = () => {
    !movieLibrary && setTypeSection(false),
      setFolderLoadSection(true),
      setMovieLibrary(true),
      setTvLibrary(false);
  };

  const handleTvMedia = () => {
    // !tvLibrary && setTypeSection(false),
    //   setFolderLoadSection(true),
    //   setTvLibrary(true),
    //   setMovieLibrary(false);
  };

  const handleOk = () => {
    if (ok) {
      if (tvLibrary) {
        showLatestTv();
      } else if (movieLibrary) {
        showLatestMovies();
      }
      setOk(false);
    }
  };

  return (
    <>
      <Activity mode={modalOpen ? "visible" : "hidden"}>
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto text-center justify-items-center backdrop-blur-md">
          <div className="flex flex-col justify-self-center justify-between  bg-[#2D3742] text-white border-gray-900 border-2 min-w-[600px] min-h-[300px] max-w-[800px] max-h-[500px] rounded-lg">
            {/* modal header  */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 text-gray-400 bg-gray-800">
              <div className="flex items-center space-x-2">
                <AiOutlinePlus />
                <h2>Add Library</h2>
              </div>
              <button className="" onClick={handleClose}>
                <AiOutlineCloseCircle className="text-2xl" />
              </button>
            </div>
            <div className="flex pr-2">
              {/* modal menu */}
              <div className="space-y-6 min-w-[200px] min-h-[35vh] p-4">
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${
                    !typeSection
                      ? "text-gray-400"
                      : "text-[#CC7B19] font-semibold"
                  }`}
                >
                  <VscListSelection className="text-2xl" />
                  <p>Select type</p>
                </button>
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${
                    !folderLoadSection
                      ? "text-gray-400"
                      : "text-[#CC7B19] font-semibold"
                  }`}
                >
                  <FaFolderOpen className="text-2xl" />
                  <p>Add folders</p>
                </button>
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${
                    !advancedSection
                      ? "text-gray-400"
                      : "text-[#CC7B19] font-semibold"
                  }`}
                >
                  <BsGearFill className="text-2xl" />
                  <p>Advanced</p>
                </button>
              </div>
              {/* modal menu options */}
              <div className="flex flex-col justify-start">
                {/* select library type section */}
                <div>
                  <p className="pt-4 font-semibold text-gray-400">
                    Select library type
                  </p>
                  <div className="flex pb-4 space-x-16 space-y-8 text-gray-400">
                    <label
                      htmlFor="movies"
                      onClick={handleMovieMedia}
                      className={`flex flex-col items-center justify-end space-y-2 cursor-pointer ${
                        movieLibrary && "text-[#CC7B19] font-semibold"
                      }`}
                    >
                      <BsFilm className="text-4xl" />
                      <p>Movies</p>
                    </label>
                    <input
                      type="radio"
                      id="movies"
                      name="media"
                      value="movies"
                      defaultChecked
                      className="hidden"
                    />

                    <input
                      type="radio"
                      id="tv"
                      name="media"
                      value="tv"
                      className="hidden"
                    />
                    <label
                      htmlFor="tv"
                      onClick={handleTvMedia}
                      className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                        tvLibrary && "text-[#CC7B19] font-semibold"
                      }`}
                    >
                      <MdMonitor className="text-4xl" />
                      <p className="inline-block w-[90px]">TV Shows</p>
                    </label>

                    <input
                      type="radio"
                      id="music"
                      name="media"
                      value="music"
                      className="hidden"
                    />
                    <label
                      htmlFor="music"
                      className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                        musicLibrary && "text-[#CC7B19] font-semibold"
                      }`}
                    >
                      <HiOutlineMusicNote className="text-4xl" />
                      <p>Music</p>
                    </label>
                  </div>
                </div>
                {/* add folders section */}
                {folderLoadSection && (
                  <div className="pb-4 space-y-2">
                    <p>Add folders to your library</p>
                    <input
                      className="mr-2 bg-gray-800 rounded-xl"
                      ref={folderPickerRef}
                      type="file"
                      {...({ directory: "", webkitdirectory: "" } as any)}
                      onChange={addFolderUrl}
                      hidden
                    />
                    <button
                      onClick={() => folderPickerRef.current?.click()}
                      className="p-2 bg-gray-600 rounded-lg"
                      disabled={isProcessing || isSaving}
                    >
                      {isSaving
                        ? "SAVING TO COLLECTION..."
                        : isProcessing
                        ? "PROCESSING..."
                        : "BROWSE FOR MEDIA FOLDER"}
                    </button>

                    {isProcessing && (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">
                            Processing files...
                          </span>
                          <span className="text-gray-400">
                            {processedCount}/{totalFiles}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#CC7B19] h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(processedCount / totalFiles) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400">
                          Please wait while we fetch movie data from TMDB. This
                          may take a moment.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {/* advanced section */}
                <div></div>
              </div>
            </div>
            <div className="flex items-center justify-end py-2 pr-2 space-x-2 bg-gray-800">
              {/* modal buttons */}
              <button
                className="p-2 bg-gray-700 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className={`p-2 rounded-md ${
                  ok ? "bg-gray-900" : "bg-red-700"
                }`}
              >
                OK
              </button>
            </div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
        </div>
      </Activity>
    </>
  );
}

export default MediaModal;
