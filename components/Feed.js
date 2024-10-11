import MediaCard from './MediaCard';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import {
  menuSizeState,
  homeMovieState,
  homeTvState,
  homeMenuState,
  movieMenuState,
  tvMenuState,
  sliderState
} from '../atoms/modalAtom';
import SliderComp from './SliderComp';
import MovieFiles from './props/MovieFiles';
import TvFiles from './props/TvFiles';

function Feed() {
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [latestMovie, setLatestMovie] = useRecoilState(homeMovieState);
  const [latestTv, setLatestTv] = useRecoilState(homeTvState);
  const [homeMenu, setHomeMenu] = useRecoilState(homeMenuState);
  const [movieMenu, setMovieMenu] = useRecoilState(movieMenuState);
  const [tvMenu, setTvMenu] = useRecoilState(tvMenuState);
  const [slider, setSlider] = useRecoilState(sliderState);

  return (
    <section className='w-full px-3 pt-3 mr-3 text-2xl text-gray-300 rounded-md'>
      {(latestMovie || latestTv) && (
        <div className='flex items-center justify-between'>
          <h2>{`${homeMenu ? 'Home' : movieMenu ? 'Movies' : 'TV Shows'}`}</h2>

          <SliderComp
            defaultValue={slider}
            step={25}
            min={0}
            max={100}
            onChange={(value) => setSlider(value)}
          />
        </div>
      )}
      {homeMenu && (
        <section className='w-full'>
          <div
            className={`${menuSize
              ? 'w-[73vw] sm:w-[78vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw]'
              : 'w-[51vw] sm:w-[60vw] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]'
              } mb-7`}
          ></div>
          <div
            className={`${menuSize
              ? 'w-[73vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw]'
              : 'w-[30vh] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]'
              } `}
          >
            {!latestMovie && !latestTv && (
              <div className='flex flex-col items-center justify-center pt-20'>
                <Image
                  src='https://res.cloudinary.com/dcwuuolk8/image/upload/v1650308268/Plix/plix-logo-w_yrxkmt.png'
                  alt='logo'
                  height={200}
                  width={600}
                />
                <p className='pt-20 italic font-thin text-gray-200'>
                  Add Media from menu bar on the left.
                </p>
              </div>
            )}
            {(latestMovie || latestTv) && (
              <div className='flex flex-wrap justify-start pt-4 overflow-y-scroll h-[77vh] scrollbar-hide object-contain w-full'>
                {latestMovie && (
                  <div className='w-full'>
                    <h3>Latest Movies</h3>
                    <div className='flex object-contain w-full pb-4 pl-3 overflow-hidden overflow-x-scroll space-x-7 scrollbar-track-gray-800 scrollbar-thumb-black scrollbar-thin'>
                      {MovieFiles.map((movie) => (
                        <MediaCard
                          key={movie.id}
                          id={movie.id} // to remove
                          name={movie.name}
                          tmdbId={movie.tmdbId}
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
                {latestTv && (
                  <div className='pt-9'>
                    <h3>Latest TV Shows</h3>
                    <div className='flex object-contain w-full pb-4 pl-3 overflow-hidden overflow-x-scroll space-x-7 scrollbar-track-gray-800 scrollbar-thumb-black scrollbar-thin'>
                      {TvFiles.map((tv) => (
                        <MediaCard
                          key={tv.id}
                          id={tv.id} // to remove
                          name={tv.name}
                          tmdbId={tv.tmdbId}
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
      {movieMenu && (
        <section>
          <div className='flex flex-wrap justify-start pt-4 overflow-y-scroll h-[80vh] scrollbar-hide object-contain w-full pl-1'>
            {MovieFiles.map((movie) => (
              <div className='pr-7' key={movie.id}>
                <MediaCard
                  id={movie.id} // to remove
                  name={movie.name}
                  tmdbId={movie.tmdbId}
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
      {tvMenu && (
        <section>
          <div className='flex flex-wrap justify-start pt-4 overflow-y-scroll h-[80vh] scrollbar-hide object-contain'>
            {TvFiles.map((tv) => (
              <div className='pr-7' key={tv.id}>
                <MediaCard
                  id={tv.id} // to remove
                  name={tv.name}
                  tmdbId={tv.tmdbId}
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
