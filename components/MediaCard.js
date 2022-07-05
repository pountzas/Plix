import Image from 'next/image';
import MediaItemProps from './props/MediaItemProps';
import { useRecoilState } from 'recoil';
import { mediaItemState, sliderState } from '../atoms/modalAtom';

import { BsPlayCircleFill, BsFillPencilFill, BsCircle } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import SliderProps from './props/SliderProps';
import { MediaCardOptions } from './MediaCardOptions';
import { useState } from 'react';

function MediaCard({
  id,
  name,
  tmdbId,
  adult,
  backdrop,
  lang,
  popularity,
  voteAverage,
  voteCount,
  tmdbPoster,
  tmdbTitle,
  tmdbOverview,
  tmdbReleaseDate,
  tmdbRating,
  tmdbGenre,
  fileName,
  objurl,
  folderPath,
  folderPath2,
  rootPath,
  watched
}) {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const [slider, setSlider] = useRecoilState(sliderState);
  const [disable, setDisable] = useState(false);
  const handlePlayer = () => {};

  const sendMediaValue = () => {
    MediaItemProps = {
      id,
      name,
      tmdbId,
      adult,
      backdrop,
      lang,
      popularity,
      voteAverage,
      voteCount,
      tmdbPoster,
      tmdbTitle,
      tmdbOverview,
      tmdbReleaseDate,
      tmdbRating,
      tmdbGenre,
      fileName,
      objurl,
      folderPath,
      folderPath2,
      rootPath,
      watched
    };
  };

  const handleMediaCardClick = () => {
    !disable && setMediaItem(true), sendMediaValue();
  };

  const enablePlay = () => {
    setDisable(false);
  };

  const disablePlay = () => {
    setDisable(true);
  };

  const pressDots = () => {};
  const press = () => {};

  return (
    <div onClick={handleMediaCardClick} className='min-w-max'>
      <div className='group pb-2'>
        <div className='text-5xl'>
          <div
            className='flex opacity-0 shadow-sm group-hover:opacity-100'
            onClick={handlePlayer}
          >
            <div>
              <BsPlayCircleFill
                onClick={press}
                className={`${SliderProps[slider]['play']} relative z-10 rounded-full bg-gray-300 p-[1px] text-gray-900 opacity-80 transition-all hover:bg-gray-900 hover:p-0 hover:text-[#CC7B19] hover:opacity-100`}
              />
            </div>
            <MediaCardOptions />
            <div>
              <BsFillPencilFill
                onClick={press}
                onMouseEnter={disablePlay}
                onMouseLeave={enablePlay}
                className={`${SliderProps[slider]['edit']} text-gray-30 relative z-10 hover:text-[#CC7B19]`}
              />
            </div>
            <div>
              <BsCircle
                onClick={press}
                className={`${SliderProps[slider]['later']} relative z-10 text-gray-300 hover:text-[#CC7B19]`}
              />
            </div>
          </div>
        </div>
        <div className={`rounded-md outline-[#CC7B19] group-hover:outline`}>
          <Image
            className='rounded-md'
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tmdbPoster}`}
            alt='movie poster'
            loading='lazy'
            height={SliderProps[slider]['height']}
            width={SliderProps[slider]['width']}
          />
        </div>
      </div>
      <h3
        className={`cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold ${SliderProps[slider]['title']}`}
      >
        {tmdbTitle}
      </h3>
      <h3 className='cursor-pointer text-sm font-semibold text-gray-400'>
        {tmdbReleaseDate}
      </h3>
    </div>
  );
}

export default MediaCard;
