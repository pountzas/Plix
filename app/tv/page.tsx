import Head from "next/head";
import Layout from "../../components/Layout";
import Feed from "../../components/Feed";

export default function TV() {
  return (
    <Layout>
      <Head>
        <title>TV Shows - Plix</title>
        <meta name="TV Shows" content="Browse your TV show collection" />
      </Head>

      <Feed />
    </Layout>
  );
}
