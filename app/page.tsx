import Head from "next/head";
import Layout from "../components/Layout";
import Feed from "../components/Feed";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Plix - Home</title>
        <meta name="Plix" content="Your personal media library" />
        <link rel="icon" href="/Plex.ico" />
      </Head>

      <Feed />
    </Layout>
  );
}
