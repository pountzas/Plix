import Head from 'next/head';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import MediaModal from '../components/MediaModal';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { bgImageUrl, imageState, movieMenuState } from '../atoms/modalAtom';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  const [bgImage, setBgImage] = useRecoilState(bgImageUrl);
  const [image, setImage] = useRecoilState(imageState);
  const [movieMenu, setMovieMenu] = useRecoilState(movieMenuState);

  useEffect(() => {
    if (image) {
      console.log(bgImage + 'bgImage');
    }
  }, [image, bgImage]);

  return (
    <div
      className={`relative bg-gradient-to-bl from-[#2A3440] to-[#323C45] min-w-screen ${
        session ? 'min-h-[101vh]' : 'min-h-[100vh]'
      }`}
    >
      <div
        className={`absolute min-w-full ${
          movieMenu
            ? !image
              ? `min-h-[100vh] bg-gradient-to-bl from-[#2A3440] to-[#323C45]`
              : `min-h-screen `
            : `min-h-screen `
        }`}
      >
        {image && (
          <div>
            <Image
              className='z-0 opacity-30 min-w-full min-h-screen '
              src={`https://www.themoviedb.org/t/p/original${bgImage}`}
              alt=''
              layout='fill'
              loading='lazy'
              placeholder={`blur`}
              blurDataURL={`https://www.themoviedb.org/t/p/w220_and_h330_face${bgImage}`}
            />
          </div>
        )}
      </div>
      <div className='z-2 absolute'>
        <Head>
          <title>Plix</title>
          <meta name='Plix' content='next app' />
          <link rel='icon' href='/Plex.ico' />
        </Head>
        <Header />
        {session && <Dashboard />}

        {/* MediaModal */}
        <MediaModal />
      </div>
    </div>
  );
}
