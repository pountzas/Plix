function signin() {
  return <div>signin</div>;
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
