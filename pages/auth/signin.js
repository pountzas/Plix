import { getProviders, signIn } from 'next-auth/react';
import Header from '../../components/Header';

export default function SignIn({ providers }) {
  return (
    <section className='bg-gray-800'>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt56 px-14 text-center'>
        <p className='font-xs italic text-gray-200'>
          This is not a real App, it is built for educational purposes only.
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </section>
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
