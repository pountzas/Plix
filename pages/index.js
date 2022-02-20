import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className='absolute min-w-full min-h-screen bg-gradient-to-l from-[#2A3440] to-[#323C45]'>
      <Head>
        <title>Plix</title>
        <meta name='Plix' content='next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
    </div>
  );
}
