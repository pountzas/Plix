import Image from 'next/image';
import MediaItemProps from './props/MediaItemProps';
import { useRecoilState } from 'recoil';
import { mediaItemState, sliderState } from '../atoms/modalAtom';

import { BsPlayCircleFill, BsFillPencilFill, BsCircle } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import SliderProps from './props/SliderProps';

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
  rootPath
}) {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const [slider, setSlider] = useRecoilState(sliderState);

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
      rootPath
    };
  };

  const handleMediaCardClick = () => {
    setMediaItem(true);
    sendMediaValue();
  };

  const press = () => {};

  return (
    <div onClick={handleMediaCardClick} className='min-w-max'>
      <div className='pb-2 group'>
        <div className='text-5xl'>
          <div
            className='opacity-0 group-hover:opacity-100 flex shadow-sm'
            onClick={handlePlayer}
          >
            <BsPlayCircleFill
              onClick={press}
              className={`${SliderProps[slider]['play']} relative transition-all z-10 p-[1px] text-gray-900 opacity-80 bg-gray-300 hover:opacity-100 hover:p-0 hover:text-[#CC7B19] hover:bg-gray-900 rounded-full`}
            />
            <HiDotsVertical
              onClick={press}
              className={`${SliderProps[slider]['options']} hover:text-[#CC7B19] relative z-10 text-gray-300`}
            />
            <BsFillPencilFill
              onClick={press}
              className={`${SliderProps[slider]['edit']} hover:text-[#CC7B19] relative z-10 text-gray-30`}
            />
            <BsCircle
              onClick={press}
              className={`${SliderProps[slider]['later']} hover:text-[#CC7B19] relative z-10 text-gray-300`}
            />
          </div>

          {/* <BsPlayCircle className='relative hidden top-32 left-10 z-10 hover:bg-[#CC7B19] rounded-full' /> */}
        </div>
        <Image
          className='absolute hover:opacity-50 rounded-md'
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${tmdbPoster}`}
          alt='movie poster'
          loading='lazy'
          height={SliderProps[slider]['height']}
          width={SliderProps[slider]['width']}
        />
      </div>
      <h3
        className={`font-semibold text-sm overflow-hidden whitespace-nowrap text-ellipsis ${SliderProps[slider]['title']}`}
      >
        {tmdbTitle}
      </h3>
      <h3 className='text-sm text-gray-400 font-semibold'>{tmdbReleaseDate}</h3>
    </div>
  );
}

export default MediaCard;
