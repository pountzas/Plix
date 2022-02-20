import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
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
