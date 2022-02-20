import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-l from-[#313C4A] to-[#323C46]'>
      <Head>
        <title>Plix</title>
        <meta name='Plix' content='next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex justify-center items-center'>
        <h1>Plix</h1>
      </div>
    </div>
  );
}
