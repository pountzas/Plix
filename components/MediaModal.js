import { useRecoilState } from 'recoil';
import { modalState, homeMovieState } from '../atoms/modalAtom';

import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { VscListSelection } from 'react-icons/vsc';
import { FaFolderOpen } from 'react-icons/fa';
import { BsFilm, BsGearFill } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useRef } from 'react';
import MovieFiles from './props/MovieFiles';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [latestMovie, setLatestMovie] = useRecoilState(homeMovieState);

  const folderPickerRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const showLatestMovies = () => {
    setLatestMovie(true);
    handleClose();
  };

  const addFolderUrl = (e) => {
    const reader = new FileReader();

    const path = e.target.files[0];
    const filesPath = e.target.result;
    const files = e.target.files;
    console.log(path);
    console.log(filesPath);
    console.log(files.length);

    for (let i = 0; i < files.length; i++) {
      // find videos with type
      if (files[i].type.includes('video')) {
        // regex files name without all characters after the year
        const name = files[i].name.match(
          /^(?!\d\d?[ex]\d\d?)(?:\[(?:[-\w\s]+)*\] )?(.*?)[-_. ]?(?:[\{\(\[]?(?:dvdrip|[-._\b]ita|[-._\b]eng|xvid| cd\d|dvdscr|\w{1,5}rip|divx|\d+p|\d{4}).*?)?\.([\w]{2,3})$/i
        )[1];
        // regex replace . with ' '
        name = name.replace(/\./g, ' ');

        const getMediaData = async () => {
          if (name) {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=120f1a60fbfcc0d0f3e9775e7816cde3&query=${name}&append_to_response=videos,images`
            );

            const data = await response.json();
            const tmdbId = data.results[0]?.id;

            tmdbId
              ? MovieFiles.push({
                  name,
                  id: i,
                  tmdbId,
                  adult: data.results[0].adult,
                  backdrop_path: data.results[0]?.backdrop_path,
                  lang: data.results[0]?.original_language,
                  popularity: data.results[0]?.popularity,
                  voteAverage: data.results[0]?.vote_average,
                  voteCount: data.results[0]?.vote_count,
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
                  folderPath2: files[i].webkitdirectory,
                  rootPath: files[i].path,
                })
              : console.log(name + ' not found ' + files[i].webkitRelativePath);
          }
        };
        getMediaData();
      }
    }
    console.log(MovieFiles);
  };

  return (
    <>
      {open && (
        <div className='flex items-center justify-center justify-items-center text-center fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex flex-col justify-self-center justify-between  bg-[#2D3742] text-white border-gray-900 border-2 min-w-[600px] min-h-[300px] max-w-[800px] max-h-[500px] rounded-lg'>
            {/* modal header  */}
            <div className='flex items-center bg-gray-800 justify-between pt-4 px-4 text-gray-400 pb-3'>
              <div className='flex space-x-2 items-center'>
                <AiOutlinePlus />
                <h2>Add Library</h2>
              </div>
              <button className='' onClick={handleClose}>
                <AiOutlineCloseCircle className='text-2xl' />
              </button>
            </div>
            <div className='flex pr-2'>
              {/* modal menu */}
              <div className='space-y-6 min-w-[200px] min-h-[35vh] p-4'>
                <button className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                  <VscListSelection className='text-2xl' />
                  <p>Select type</p>
                </button>
                <button className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                  <FaFolderOpen className='text-2xl' />
                  <p>Add folders</p>
                </button>
                <button className=' flex items-center space-x-3 text-gray-400 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                  <BsGearFill className='text-2xl' />
                  <p>Advanced</p>
                </button>
              </div>
              {/* modal menu options */}
              <div className='flex flex-col justify-start'>
                {/* select library type section */}
                <div>
                  <p className='text-gray-400 pt-4 font-semibold'>
                    Select library type
                  </p>
                  <div className='flex pb-4 space-y-8 space-x-16 text-gray-400'>
                    <label
                      htmlFor='movies'
                      className='flex flex-col items-center justify-end space-y-2 cursor-pointer active:text-[#CC7B19] focus:text-[#CC7B19] focus:font-semibold'
                    >
                      <BsFilm className='text-4xl' />
                      <p>Movies</p>
                    </label>
                    <input
                      type='radio'
                      id='movies'
                      name='media'
                      value='movies'
                      defaultChecked
                      className='hidden focus:after:text-[#CC7B19]'
                    />

                    <input
                      type='radio'
                      id='tv'
                      name='media'
                      value='tv'
                      className='hidden'
                    />
                    <label
                      htmlFor='tv'
                      className='flex flex-col items-center justify-center space-y-2 cursor-pointer checked:text-[#CC7B19] checked:font-semibold'
                    >
                      <MdMonitor className='text-4xl' />
                      <p className='inline-block w-[70px]'>TV Shows</p>
                    </label>

                    <input
                      type='radio'
                      id='music'
                      name='media'
                      value='music'
                      className='hidden'
                    />
                    <label
                      htmlFor='music'
                      className='flex flex-col items-center justify-center space-y-2 cursor-pointer checked:text-[#CC7B19] checked:font-semibold'
                    >
                      <HiOutlineMusicNote className='text-4xl' />
                      <p>Music</p>
                    </label>
                  </div>
                </div>
                {/* add folders section */}
                <div className='space-y-2 pb-4'>
                  <p>Add folders to your library</p>
                  <input
                    className='bg-gray-800 rounded-xl mr-2'
                    ref={folderPickerRef}
                    type='file'
                    directory=''
                    webkitdirectory=''
                    onChange={addFolderUrl}
                    hidden
                  />
                  <button
                    onClick={() => folderPickerRef.current.click()}
                    className='p-2 bg-gray-600 rounded-lg'
                  >
                    BROWSE FOR MEDIA FOLDER
                  </button>
                </div>
                {/* advanced section */}
                <div></div>
              </div>
            </div>
            <div className='flex items-center justify-end space-x-2 bg-gray-800 py-2 pr-2'>
              {/* modal buttons */}
              <button
                className='bg-gray-700 p-2 rounded-md'
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                onClick={showLatestMovies}
                className='bg-gray-900 p-2 rounded-md'
              >
                OK
              </button>
            </div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
            &#8203;
          </span>
        </div>
      )}
    </>
  );
}

export default MediaModal;
