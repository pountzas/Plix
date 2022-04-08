import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { VscListSelection } from 'react-icons/vsc';
import { FaFolderOpen } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import { BsFilm } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useState, useRef } from 'react';
import MovieFiles from './MovieFiles';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const folderPickerRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const addFolderUrl = (e) => {
    const reader = new FileReader();

    const path = e.target.files[0];
    const filesPath = e.target.result;
    const files = e.target.files;
    // const url = URL.createObjectURL(e.target.files[0]);
    // console.log('url', url);
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
              `https://api.themoviedb.org/3/search/movie?api_key=120f1a60fbfcc0d0f3e9775e7816cde3&query=${name}`
            );

            const data = await response.json();
            console.log(data.results[0]);
            const tmdbId = data.results[0]?.id;
            const tmdbPoster = data.results[0]?.poster_path;
            const tmdbTitle = data.results[0]?.title;
            const tmdbOverview = data.results[0]?.overview;
            const tmdbReleaseDate = data.results[0]?.release_date.substring(
              0,
              4
            );
            const tmdbRating = data.results[0]?.vote_average;
            const tmdbGenre = data.results[0]?.genre_ids;

            tmdbId
              ? MovieFiles.push({
                  name,
                  id: i,
                  tmdbId,
                  tmdbPoster,
                  tmdbTitle,
                  tmdbOverview,
                  tmdbReleaseDate,
                  tmdbRating,
                  tmdbGenre,
                  fileName: files[i].name,
                  ObjUrl: URL.createObjectURL(files[i]),
                  folderPath: files[i].webkitRelativePath,
                  folderPath2: files[i].webkitdirectory,
                  rootPath: files[i].path,
                  // name: files[i].name.match(/^(.+?)\.[^.]+$/)[1], // regex files name to be until before the last dot
                })
              : console.log(name + ' not found ' + files[i].webkitRelativePath);
          }
        };
      }
    }
    console.log(MovieFiles);
  };

  return (
    <>
      {open && (
        <div className='flex flex-col justify-between fixed z-10 inset-52 overflow-y-auto bg-[#2D3742] text-white border-gray-900 border-2 max-w-[80vw] rounded-lg'>
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
          <div className='flex gap-5 pr-2'>
            {/* modal menu */}
            <div className='space-y-6 min-w-[15vw] min-h-[46vh] p-4'>
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
            <div>
              {/* select library type section */}
              <div>
                <p className='text-gray-400 pt-4 font-semibold'>
                  Select library type
                </p>
                <div className='flex py-4 space-y-8 space-x-16 text-gray-400'>
                  <button className='flex flex-col items-center justify-end space-y-2 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                    <BsFilm className='text-5xl' />
                    <p>Movies</p>
                  </button>
                  <button className='flex flex-col items-center justify-center space-y-2 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                    <MdMonitor className='text-5xl' />
                    <p>TV Shows</p>
                  </button>
                  <button className='flex flex-col items-center justify-center space-y-2 cursor-pointer focus:text-[#CC7B19] focus:font-semibold'>
                    <HiOutlineMusicNote className='text-5xl' />
                    <p>Music</p>
                  </button>
                </div>
              </div>
              {/* add folders section */}
              <div className=' space-y-6'>
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
            <button className='bg-gray-900 p-2 rounded-md'>Next</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MediaModal;
