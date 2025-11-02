'use client'

import MediaCard from "./MediaCard";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";
import { useVisualStore } from "../stores/visualStore";
import SliderComp from "./SliderComp";

function Feed() {
  const menuSize = useUiStore((state) => state.menuSize);
  const latestMovie = useMediaStore((state) => state.homeMovieLoaded);
  const latestTv = useMediaStore((state) => state.homeTvLoaded);
  const persistedMovies = useMediaStore((state) => state.persistedMovies);
  const persistedTvShows = useMediaStore((state) => state.persistedTvShows);
  const slider = useVisualStore((state) => state.sliderValue);
  const setSliderValue = useVisualStore((state) => state.setSliderValue);
  const pathname = usePathname();

  // Determine content type based on current route
  const isHomePage = pathname === "/";
  const isMoviesPage = pathname === "/movies";
  const isTVPage = pathname === "/tv";

  return (
    <section className="w-full px-3 pt-3 mr-3 text-2xl text-gray-300 rounded-md">
      {((latestMovie || latestTv) || (persistedMovies.length > 0 || persistedTvShows.length > 0)) && (
        <div className="flex items-center justify-between">
          <h2>{`${isHomePage ? "Home" : isMoviesPage ? "Movies" : isTVPage ? "TV Shows" : "Library"}`}</h2>

          <SliderComp
            defaultValue={slider}
            step={25}
            min={0}
            max={100}
            onChange={(value) =>
              setSliderValue(typeof value === "number" ? value : value[0])
            }
          />
        </div>
      )}
      {isHomePage && (
        <section className="w-full">
          <div
            className={`${
              menuSize
                ? "w-[73vw] sm:w-[78vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw]"
                : "w-[51vw] sm:w-[60vw] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]"
            } mb-7`}
          ></div>
          <div
            className={`${
              menuSize
                ? "w-[73vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw]"
                : "w-[30vh] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]"
            } `}
          >
            {persistedMovies.length === 0 && persistedTvShows.length === 0 && !latestMovie && !latestTv && (
              <div className="flex flex-col items-center justify-center pt-20">
                <Image
                  src="https://res.cloudinary.com/dcwuuolk8/image/upload/v1650308268/Plix/plix-logo-w_yrxkmt.png"
                  alt="logo"
                  height={200}
                  width={600}
                />
                <p className="pt-20 italic font-thin text-gray-200">
                  Add Media from menu bar on the left.
                </p>
              </div>
            )}
            {((latestMovie || latestTv) || (persistedMovies.length > 0 || persistedTvShows.length > 0)) && (
              <div className="flex flex-wrap justify-start pt-4 overflow-y-scroll h-[77vh] scrollbar-hide object-contain w-full">
                {(latestMovie || persistedMovies.length > 0) && (
                  <div className="w-full">
                    <h3>{latestMovie ? "Latest Movies" : "Your Movies"}</h3>
                    <div className="flex object-contain w-full pb-4 pl-3 overflow-hidden overflow-x-scroll space-x-7 scrollbar-track-gray-800 scrollbar-thumb-black scrollbar-thin">
                      {persistedMovies.map((movie) => (
                        <MediaCard
                          key={movie.id}
                          id={movie.id}
                          name={movie.name}
                          tmdbId={movie.tmdbId}
                          mediaType="movie"
                          adult={movie.adult}
                          backdrop_path={movie.backdrop_path}
                          lang={movie.original_language}
                          popularity={movie.popularity}
                          voteAverage={movie.vote_average}
                          voteCount={movie.vote_count}
                          tmdbPoster={movie.tmdbPoster}
                          tmdbTitle={movie.tmdbTitle}
                          tmdbOverview={movie.tmdbOverview}
                          tmdbReleaseDate={movie.tmdbReleaseDate}
                          tmdbRating={movie.tmdbRating}
                          tmdbGenre={movie.tmdbGenre}
                          fileName={movie.fileName}
                          ObjUrl={movie.ObjUrl}
                          folderPath={movie.folderPath}
                          folderPath2={movie.folderPath2}
                          rootPath={movie.rootPath}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {(latestTv || persistedTvShows.length > 0) && (
                  <div className="pt-9">
                    <h3>{latestTv ? "Latest TV Shows" : "Your TV Shows"}</h3>
                    <div className="flex object-contain w-full pb-4 pl-3 overflow-hidden overflow-x-scroll space-x-7 scrollbar-track-gray-800 scrollbar-thumb-black scrollbar-thin">
                      {persistedTvShows.map((tv) => (
                        <MediaCard
                          key={tv.id}
                          id={tv.id}
                          name={tv.name}
                          tmdbId={tv.tmdbId}
                          mediaType="tv"
                          adult={tv.adult}
                          backdrop_path={tv.backdrop_path}
                          lang={tv.original_language}
                          popularity={tv.popularity}
                          voteAverage={tv.vote_average}
                          voteCount={tv.vote_count}
                          tmdbPoster={tv.tmdbPoster}
                          tmdbTitle={tv.tmdbTitle}
                          tmdbOverview={tv.tmdbOverview}
                          tmdbReleaseDate={tv.tmdbReleaseDate}
                          tmdbRating={tv.tmdbRating}
                          tmdbGenre={tv.tmdbGenre}
                          fileName={tv.fileName}
                          ObjUrl={tv.ObjUrl}
                          folderPath={tv.folderPath}
                          folderPath2={tv.folderPath2}
                          rootPath={tv.rootPath}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Movie menu */}
      {isMoviesPage && (
        <section>
          <div className="flex flex-wrap justify-start pt-4 overflow-y-scroll h-[80vh] scrollbar-hide object-contain w-full pl-1">
            {persistedMovies.map((movie) => (
              <div className="pr-7" key={movie.id}>
                <MediaCard
                  id={movie.id}
                  name={movie.name}
                  tmdbId={movie.tmdbId}
                  mediaType="movie"
                  adult={movie.adult}
                  backdrop_path={movie.backdrop_path}
                  lang={movie.original_language}
                  popularity={movie.popularity}
                  voteAverage={movie.vote_average}
                  voteCount={movie.vote_count}
                  tmdbPoster={movie.tmdbPoster}
                  tmdbTitle={movie.tmdbTitle}
                  tmdbOverview={movie.tmdbOverview}
                  tmdbReleaseDate={movie.tmdbReleaseDate}
                  tmdbRating={movie.tmdbRating}
                  tmdbGenre={movie.tmdbGenre}
                  fileName={movie.fileName}
                  ObjUrl={movie.ObjUrl}
                  folderPath={movie.folderPath}
                  folderPath2={movie.folderPath2}
                  rootPath={movie.rootPath}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TV menu */}
      {isTVPage && (
        <section>
          <div className="flex flex-wrap justify-start pt-4 overflow-y-scroll h-[80vh] scrollbar-hide object-contain">
            {persistedTvShows.map((tv) => (
              <div className="pr-7" key={tv.id}>
                <MediaCard
                  id={tv.id}
                  name={tv.name}
                  tmdbId={tv.tmdbId}
                  mediaType="tv"
                  adult={tv.adult}
                  backdrop_path={tv.backdrop_path}
                  lang={tv.original_language}
                  popularity={tv.popularity}
                  voteAverage={tv.vote_average}
                  voteCount={tv.vote_count}
                  tmdbPoster={tv.tmdbPoster}
                  tmdbTitle={tv.tmdbTitle}
                  tmdbOverview={tv.tmdbOverview}
                  tmdbReleaseDate={tv.tmdbReleaseDate}
                  tmdbRating={tv.tmdbRating}
                  tmdbGenre={tv.tmdbGenre}
                  fileName={tv.fileName}
                  ObjUrl={tv.ObjUrl}
                  folderPath={tv.folderPath}
                  folderPath2={tv.folderPath2}
                  rootPath={tv.rootPath}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default Feed;
