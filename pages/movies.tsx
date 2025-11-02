import Head from "next/head";
import Layout from "../components/Layout";
import Feed from "../components/Feed";

export default function Movies() {
  return (
    <Layout>
      <Head>
        <title>Movies - Plix</title>
        <meta name="Movies" content="Browse your movie collection" />
      </Head>

      <Feed />
    </Layout>
  );
}
