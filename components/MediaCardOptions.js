import MediaItemProps from './props/MediaItemProps';
import { RecoilState } from 'recoil';
import MediaCard from './MediaCard';

// MediaCard({ watched }) === true ? setWatched(false) : setWatched(true);
// ? MediaCard({watched})= false && console.log('watched')
// : MediaCard({watched}) = true && console.log('not watched');
import React from 'react';
import { HiDotsVertical } from 'react-icons/hi';

const MediaCardOptions = ({ watched }) => {
  const handleMediaCardOptionsClick = () => {};
  const handleWatched = () => {};
  const options = [
    {
      value: 'Watch together',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Play Next',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Add to Queue',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Add to ..',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: watched ? 'Mark as unwatched' : 'Mark as watched',
      onclick: handleWatched
    },
    {
      value: 'if still wacthing & remove',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Refresh Data',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Analyze',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Optimize...',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Download File',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Grant Access...',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Delete',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'View Play History',
      onclick: handleMediaCardOptionsClick
    },
    {
      value: 'Get Info',
      onclick: handleMediaCardOptionsClick
    }
  ];

  return (
    <div>
      <HiDotsVertical
        onClick={pressDots}
        onMouseEnter={disablePlay}
        onMouseLeave={enablePlay}
        className={`peer ${SliderProps[slider]['options']} peer relative z-10 text-gray-300 hover:text-[#CC7B19]`}
      />
      <div className='absolute z-10 hidden flex-col rounded-md bg-gray-900  drop-shadow-lg hover:flex peer-hover:flex'>
        {MediaCardOptions.map((value, index) => (
          <p
            onMouseEnter={disablePlay}
            onMouseLeave={enablePlay}
            className='cursor-pointer px-4 py-1 text-xs hover:bg-gray-700'
            key={index}
            onClick={value.onclick}
          >
            {value.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MediaCardOptions;
