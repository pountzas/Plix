import Head from 'next/head';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import MediaModal from '../components/MediaModal';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/auth/signin');
  //   } else {
  //     router.push('/');
  //   }
  // }, [router, session]);

  return (
    <div className='absolute min-w-full min-h-screen bg-gradient-to-bl from-[#2A3440] to-[#323C45]'>
      <Head>
        <title>Plix</title>
        <meta name='Plix' content='next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      {session && <Dashboard />}

      {/* MediaModal */}
      <MediaModal />
    </div>
  );
}
