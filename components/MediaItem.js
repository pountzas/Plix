import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useRecoilState } from 'recoil';
import {
  mediaItemState,
  menuSizeState,
  castState,
  bgImageUrl,
  imageState,
  sliderState,
  bgOpacityState
} from '../atoms/modalAtom';

import MediaItemProps from './props/MediaItemProps';
import MediaCredits from './props/MediaCredits';
import MediaCrew from './props/MediaCrew';
import Writers from './props/Writers';
import SliderProps from './props/SliderProps';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaBackward } from 'react-icons/fa';
import SliderComp from './SliderComp';

function MediaItem() {
  const [mediaItem, setMediaItem] = useRecoilState(mediaItemState);
  const [menuSize, setMenuSize] = useRecoilState(menuSizeState);
  const [cast, setCast] = useRecoilState(castState);
  const [bgImage, setBgImage] = useRecoilState(bgImageUrl);
  const [image, setImage] = useRecoilState(imageState);
  const [slider, setSlider] = useRecoilState(sliderState);
  const [bgOpacity, setBgOpacity] = useRecoilState(bgOpacityState);
  const [crew, setCrew] = useState(false);

  useEffect(() => {
    getMediaDetails();
    setTimeout(() => {
      setCast(true);
      setMenuSize(menuSize);
      setCrew(true);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBgImage(MediaItemProps.backdrop_path);
    setImage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMediaDetails = async () => {
    const mediaDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${MediaItemProps.tmdbId}/credits?api_key=120f1a60fbfcc0d0f3e9775e7816cde3`
    );
    const mediaData = await mediaDetails.json();
    mediaData.cast.map((cast) => {
      MediaCredits.push({
        key: cast.order,
        name: cast.name,
        character: cast.character,
        profile_path: cast.profile_path,
        dep: cast.known_for_department
      });
    });
    mediaData.crew.map((crew) => {
      if (crew.job === 'Director') {
        MediaCrew.push({
          key: crew.id,
          name: crew.name,
          dep: crew.job
        });
      }
      if (crew.job === 'Writer') {
        Writers.push({
          key: crew.id,
          name: crew.name,
          dep: crew.job
        });
      }
    });
  };

  const handleClose = () => {
    setMediaItem(false);
    MediaItemProps = {};
    MediaCredits = [];
    MediaCrew = [];
    Writers = [];
    setCast(false);
    setBgImage('');
    setImage(false);
  };

  return (
    <div>
      <div className='flex items-start justify-between pr-4'>
        <button className='pt-3' onClick={handleClose}>
          <FaBackward className='text-[#CC7B19] hover:text-gray-700 p-1 hover:bg-[#CC7B19] rounded-full text-3xl' />
        </button>
        {crew && (
          <div>
            <SliderComp
              defaultValue={slider}
              step={25}
              min={0}
              max={100}
              onChange={(value) => setSlider(value)}
            />
            <SliderComp
              defaultValue={bgOpacity}
              step={1}
              min={1}
              max={10}
              onClick={() => setImage(!image)}
              onChange={(value) => setBgOpacity(value)}
            />
          </div>
        )}
      </div>
      <div className='flex flex-wrap justify-start pt-4 overflow-y-scroll h-[75vh] scrollbar-hide object-contain'>
        <div className='items-center lg:flex lg:space-x-8'>
          <ReactPlayer
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  volume: 1,
                  controls: true,
                  color: '#fff'
                }
              }
            }}
            url={MediaItemProps.ObjUrl}
            controls
            pip={true}
            width='640px'
            height='400px'
          />
          <div className='lg:max-w-[40vw] space-y-4'>
            <div className='text-3xl text-gray-100'>
              {MediaItemProps.tmdbTitle}
            </div>
            <div className='flex items-center space-x-4'>
              <div className='text-gray-200'>
                {MediaItemProps.tmdbReleaseDate}
              </div>
              <div className='text-gray-200'>TODO movie length</div>
            </div>
            <div className='text-gray-200'>{MediaItemProps.tmdbOverview}</div>
            {/* movie info */}
            {crew && (
              <div className='flex space-x-4'>
                <div className='font-semibold text-gray-400'>
                  <p>DIRECTED BY</p>
                  <p>WRITTEN BY</p>
                  <p>STUDIO</p>
                  <p>GENRE</p>
                </div>
                <div className='text-gray-200'>
                  <div>
                    <div className='flex items-start space-x-1'>
                      {MediaCrew.length > 0 ? (
                        MediaCrew.slice(0, 3).map((crew) => {
                          return (
                            <p className='' key={crew.key}>
                              {crew.name}
                              <br />
                            </p>
                          );
                        })
                      ) : (
                        <p className='text-gray-400'>Unknown Director</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className='flex items-start space-x-1'>
                      {Writers.length > 0 ? (
                        Writers.slice(0, 3).map((crew) => {
                          return (
                            <p className='' key={crew.key}>
                              {crew.name}
                              <br />
                            </p>
                          );
                        })
                      ) : (
                        <p className='text-gray-400'>Unknown Writers</p>
                      )}
                    </div>
                  </div>
                  <p>{MediaItemProps.tmdbProduction} TODO</p>
                  <p>{MediaItemProps.tmdbGenre} TODO</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {cast && (
          // casting
          <div className='pt-8'>
            <div className='text-gray-200'>Cast</div>
            <div
              className={`flex items-start overflow-hidden overflow-x-scroll scrollbar-hide object-contain space-x-10 pt-4 ${menuSize
                ? 'max-w-[79vw] xl:max-w-[92vw] 2xl:max-w-[92vw]'
                : 'max-w-[77vw] xl:max-w-[83vw] 2xl:max-w-[85vw]'
                }`}
            >
              {MediaCredits.map((actor) => (
                <div
                  className='flex flex-col items-center justify-center space-x-1 text-xs rounded-full border-1'
                  key={actor.key}
                >
                  <div className='flex items-center justify-center p-[2px] bg-gray-800 hover:bg-[#CC7B19] rounded-full '>
                    <Image
                      className='rounded-full shadow-xl'
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${actor.profile_path}`}
                      alt=''
                      width={SliderProps[slider]['width']}
                      height={SliderProps[slider]['width']}
                      loading='lazy'
                      layout='fixed'
                      quality='medium'
                    />
                  </div>
                  <div className='flex flex-col items-center text-center justify-center w-[100px] pt-1'>
                    <div className='text-gray-200'>{actor.name}</div>
                    <div className='text-gray-400'>{actor.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaItem;
