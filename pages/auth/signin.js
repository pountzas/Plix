import Header from '../../components/Header';

export default function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt56 px-14 text-center'>
        <p className='font-xs italic'>
          This is not a real App, it is built for educational purposes only.
        </p>
      </div>
    </>
  );
}

// Server side render
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
