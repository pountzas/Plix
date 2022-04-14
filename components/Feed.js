import { MdViewComfy } from 'react-icons/md';
import MediaCard from './MediaCard';
import { useRecoilState } from 'recoil';
import { menuSizeState, homeMovieState, homeTvState } from '../atoms/modalAtom';
import MovieFiles from './props/MovieFiles';

function Feed() {
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [latestMovie, setLatestMovie] = useRecoilState(homeMovieState);
  const [latestTv, setLatestTv] = useRecoilState(homeTvState);

  return (
    <section className='p-3 mr-3 rounded-md text-2xl text-gray-300'>
      <div
        className={`${
          menuSize
            ? 'w-[73vw] sm:w-[78vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw] 2xl:w-[92vw]'
            : 'w-[51vw] sm:w-[60vw] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]'
        } flex justify-between items-center mb-7 `}
      >
        <h2>Home</h2>
        <div className='flex items-center space-x-2 object-contain'>
          <p>bar</p>
          <MdViewComfy className='text-3xl' />
        </div>
      </div>
      <div
        className={`${
          menuSize
            ? 'w-[73vw] md:w-[81vw] lg:w-[86vw] xl:w-[90vw] 2xl:w-[92vw]'
            : 'w-[30vh] md:w-[66vw] lg:w-[74vw] xl:w-[80vw] 2xl:w-[83vw] 3xl:w-[88vw]'
        } `}
      >
          <div>
            <h3>Latest Movies</h3>
            <div className='pl-3 flex overflow-hidden space-x-7 overflow-x-scroll scrollbar-hide object-contain'>
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
        <div className='pt-9'>
          <h3>Latest TV Shows</h3>
            <div className='pl-3 flex overflow-hidden space-x-7 overflow-x-scroll scrollbar-hide object-contain'>
      </div>
    </section>
  );
}

export default Feed;
