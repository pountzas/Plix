import Head from "next/head";
import Layout from "../../components/Layout";
import Feed from "../../components/Feed";

export default function Music() {
  return (
    <Layout>
      <Head>
        <title>Music - Plix</title>
        <meta name="Music" content="Browse your music collection" />
      </Head>

      <Feed />
    </Layout>
  );
}
