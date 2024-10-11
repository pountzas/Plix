import { useRecoilState } from 'recoil';
import { modalState, homeMovieState, homeTvState } from '../atoms/modalAtom';

import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { VscListSelection } from 'react-icons/vsc';
import { FaFolderOpen } from 'react-icons/fa';
import { BsFilm, BsGearFill } from 'react-icons/bs';
import { MdMonitor } from 'react-icons/md';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { useRef, useState } from 'react';
import MovieFiles from './props/MovieFiles';
import TvFiles from './props/TvFiles';

function MediaModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [latestMovie, setLatestMovie] = useRecoilState(homeMovieState);
  const [latestTv, setLatestTv] = useRecoilState(homeTvState);
  const [typeSection, setTypeSection] = useState(true);
  const [folderLoadSection, setFolderLoadSection] = useState(false);
  const [advancedSection, setAdvancedSection] = useState(false);
  const [movieLibrary, setMovieLibrary] = useState(false);
  const [tvLibrary, setTvLibrary] = useState(false);
  const [musicLibrary, setMusicLibrary] = useState(false);
  const [ok, setOk] = useState(false);

  const folderPickerRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
    setMovieLibrary(false);
    setTvLibrary(false);
    setMusicLibrary(false);
    setTypeSection(true);
    setFolderLoadSection(false);
    setAdvancedSection(false);
  };

  const showLatestMovies = () => {
    setLatestMovie(true);
    handleClose();
  };

  const showLatestTv = () => {
    setLatestTv(true);
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
          /^(?!\d\d?[ex]\d\d?)(?:\[(?:[-\w\s]+)*\] )?(.*?)[-_. ]?(?:[\{\(\[]?(?:dvdrip|[-._\b]ita|[-._\b]h264|x264|hdtv|hdtv-lol|web|proper|internal|[-._\b]eng|xvid| cd\d|dvdscr|\w{1,5}rip|divx|\d+p|\d{4}).*?)?\.([\w]{2,3})$/i
        )[1];
        name = name.replace(/\./g, ' ');
        if (movieLibrary) {
          const getMovieData = async () => {
            if (name) {
              const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=120f1a60fbfcc0d0f3e9775e7816cde3&query=${name}&append_to_response=videos,images`
              ).catch((err) => console.log(err));

              const data = await response.json();
              console.log(data);
              const tmdbId = data?.results[0]?.id;

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
                  rootPath: files[i].path
                })
                : console.log(
                  name + ' not found ' + files[i].webkitRelativePath
                );
            }
          };
          getMovieData();
        }
        if (tvLibrary) {
          const getTvData = async () => {
            if (files[i].type.includes('video')) {
              // remove all after episode name
              let name2 = name.match(
                /^(.+?)[-. ]{0,3}s?(\d?\d)[ex](\d\d)[-. ]{0,3}(.*?)[-. ]?(?:.+)?$/gim
              );

              let episode = files[i].name.match(
                /([Ss]?)([0-9]{1,2})([xXeE\.\-]?)([0-9]{1,2})/
              );

              let nameTv2 = files[i].name.match(
                /^(.+?)[-. ]{0,3}s?(\d?\d)[ex](\d\d)[-. ]{0,3}(.*?)[-. ]?(?:(?=pulcione|eng|ita|\w+Mux|\w+dl|\d+p|XviD|NovaRip).+)?\.([\w]{2,3})$/gim
              );
              // console.log(episode + 'epi');
              // console.log(' tv ' + episode[2]);
              // episode = episode[0];

              console.log(name2 + 'test');
              console.log(name + ' name ');
              console.log(nameTv2 + ' nameTv1 ');

              name2 = JSON.stringify(name2);
              // JSON.stringify(name);
              episode?.map((epi) => {
                console.log(epi + ' epi');
              });
              // episode = JSON.stringify(episode[0]);

              console.log(' tv ' + episode);

              // toString(name2);
              // toString(episode);
              // console.log(typeof name);

              if (name2 !== null) {
                console.log(typeof episode);
                console.log(typeof name2);
                // name2.replace(episode[0], '');
                // regex remove non-alphanumeric characters keep spaces]
                name2 = name2.replace(/[^\w\s]/gi, '');
                // name2 = name2.replace(/[^a-zA-Z0-9]/g, '');
                const response = await fetch(
                  `https://api.themoviedb.org/3/search/tv?api_key=120f1a60fbfcc0d0f3e9775e7816cde3&query=${name2}`
                ).catch((err) => console.log(err));

                const data = await response.json();
                const tmdbId = data.results[0]?.id;
                console.log(tmdbId);
                console.log(name2 + ' name2 inside');
                console.log(episode[0] + ' epi inside');

                tmdbId &&
                  TvFiles.push({
                    name: name2,
                    episode: episode,
                    id: i,
                    tmdbId,
                    backdrop_path: data.results[0]?.backdrop_path,
                    lang: data.results[0]?.original_language,
                    popularity: data.results[0]?.popularity,
                    voteAverage: data.results[0]?.vote_average,
                    voteCount: data.results[0]?.vote_count,
                    tmdbPoster: data.results[0]?.poster_path,
                    tmdbTitle: data.results[0]?.name,
                    tmdbOverview: data.results[0]?.overview,
                    tmdbReleaseDate: data.results[0]?.first_air_date,
                    tmdbRating: data.results[0]?.vote_average,
                    tmdbGenre: data.results[0]?.genre_ids,
                    fileName: files[i].name,
                    ObjUrl: URL.createObjectURL(files[i]),
                    folderPath: files[i].webkitRelativePath,
                    folderPath2: files[i].webkitdirectory,
                    rootPath: files[i].path
                  });
              }
            }
          };
          getTvData();
        }
      }
    }
    setOk(true);
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
      {open && (
        <div className='fixed inset-0 z-10 flex items-center justify-center overflow-y-auto text-center justify-items-center backdrop-blur-md'>
          <div className='flex flex-col justify-self-center justify-between  bg-[#2D3742] text-white border-gray-900 border-2 min-w-[600px] min-h-[300px] max-w-[800px] max-h-[500px] rounded-lg'>
            {/* modal header  */}
            <div className='flex items-center justify-between px-4 pt-4 pb-3 text-gray-400 bg-gray-800'>
              <div className='flex items-center space-x-2'>
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
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${!typeSection
                    ? 'text-gray-400'
                    : 'text-[#CC7B19] font-semibold'
                    }`}
                >
                  <VscListSelection className='text-2xl' />
                  <p>Select type</p>
                </button>
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${!folderLoadSection
                    ? 'text-gray-400'
                    : 'text-[#CC7B19] font-semibold'
                    }`}
                >
                  <FaFolderOpen className='text-2xl' />
                  <p>Add folders</p>
                </button>
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${!advancedSection
                    ? 'text-gray-400'
                    : 'text-[#CC7B19] font-semibold'
                    }`}
                >
                  <BsGearFill className='text-2xl' />
                  <p>Advanced</p>
                </button>
              </div>
              {/* modal menu options */}
              <div className='flex flex-col justify-start'>
                {/* select library type section */}
                <div>
                  <p className='pt-4 font-semibold text-gray-400'>
                    Select library type
                  </p>
                  <div className='flex pb-4 space-x-16 space-y-8 text-gray-400'>
                    <label
                      htmlFor='movies'
                      onClick={handleMovieMedia}
                      className={`flex flex-col items-center justify-end space-y-2 cursor-pointer ${movieLibrary && 'text-[#CC7B19] font-semibold'
                        }`}
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
                      className='hidden'
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
                      onClick={handleTvMedia}
                      className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${tvLibrary && 'text-[#CC7B19] font-semibold'
                        }`}
                    >
                      <MdMonitor className='text-4xl' />
                      <p className='inline-block w-[90px]'>TV Shows</p>
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
                      className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${musicLibrary && 'text-[#CC7B19] font-semibold'
                        }`}
                    >
                      <HiOutlineMusicNote className='text-4xl' />
                      <p>Music</p>
                    </label>
                  </div>
                </div>
                {/* add folders section */}
                {folderLoadSection && (
                  <div className='pb-4 space-y-2'>
                    <p>Add folders to your library</p>
                    <input
                      className='mr-2 bg-gray-800 rounded-xl'
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
                )}
                {/* advanced section */}
                <div></div>
              </div>
            </div>
            <div className='flex items-center justify-end py-2 pr-2 space-x-2 bg-gray-800'>
              {/* modal buttons */}
              <button
                className='p-2 bg-gray-700 rounded-md'
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className={`p-2 rounded-md ${ok ? 'bg-gray-900' : 'bg-red-700'
                  }`}
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
