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

function Feed() {
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [latestMovie, setLatestMovie] = useRecoilState(homeMovieState);
  const [latestTv, setLatestTv] = useRecoilState(homeTvState);
  const [homeMenu, setHomeMenu] = useRecoilState(homeMenuState);
  const [movieMenu, setMovieMenu] = useRecoilState(movieMenuState);
  const [tvMenu, setTvMenu] = useRecoilState(tvMenuState);
  const [slider, setSlider] = useRecoilState(sliderState);

  return (
    <section className='pt-3 px-3 mr-3 rounded-md text-2xl text-gray-300'>
      {homeMenu && (
        <section>
          <div
            className={`${
              menuSize
                ? 'w-[73vw] sm:w-[78vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw]'
                : 'w-[51vw] sm:w-[60vw] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]'
            } mb-7`}
          >
            <h2>Home</h2>
            <SliderComp
              defaultValue={slider}
              step={25}
              min={0}
              max={100}
              onChange={(value) => setSlider(value)}
            />
          </div>
          <div
            className={`${
              menuSize
                ? 'w-[73vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw]'
                : 'w-[30vh] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]'
            } `}
          >
            {!latestMovie && !latestTv && (
              <div className='flex flex-col justify-center items-center pt-20'>
                <Image
                  src='https://res.cloudinary.com/dcwuuolk8/image/upload/v1650308268/Plix/plix-logo-w_yrxkmt.png'
                  alt='logo'
                  height={200}
                  width={600}
                />
                <p className='font-thin italic text-gray-200 pt-20'>
                  Add Media from menu bar on the left.
                </p>
              </div>
            )}
            {latestMovie && (
              <div>
                <h3>Latest Movies</h3>
                <div className='pl-3 flex overflow-hidden space-x-7 overflow-x-scroll scrollbar-hide'>
                  {MovieFiles.map((movie) => (
                    <MediaCard
                      key={movie.id}
                      id={movie.id} // to remove
                      name={movie.name}
                      tmdbId={movie.tmdbId}
                      adult={movie.adult}
                      backdrop={movie.backdrop_path}
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
                      objurl={movie.ObjUrl}
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
                <div className='pl-3 flex overflow-hidden space-x-7 overflow-x-scroll scrollbar-hide object-contain'>
                  {/* <MediaCard /> */}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Movie menu */}
      {movieMenu && (
        <section>
          <div className=''>
            <div className='flex items-center justify-between pr-24'>
              <h3>Movies</h3>
              <SliderComp
                defaultValue={slider}
                step={25}
                min={0}
                max={100}
                onChange={(value) => setSlider(value)}
              />
            </div>
            <div className=''>
              <div className='flex flex-wrap justify-start pt-4 overflow-y-scroll h-[80vh] scrollbar-hide object-contain'>
                {MovieFiles.map((movie) => (
                  <div className='pr-7' key={movie.id}>
                    <MediaCard
                      id={movie.id} // to remove
                      name={movie.name}
                      tmdbId={movie.tmdbId}
                      adult={movie.adult}
                      backdrop={movie.backdrop_path}
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
                      objurl={movie.ObjUrl}
                      folderPath={movie.folderPath}
                      folderPath2={movie.folderPath2}
                      rootPath={movie.rootPath}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TV menu */}
      {tvMenu && <section></section>}
    </section>
  );
}

export default Feed;
