import Head from "next/head";
import Layout from "../components/Layout";

export default function Music() {
  return (
    <Layout>
      <Head>
        <title>Music - Plix</title>
        <meta name="Music" content="Browse your music collection" />
      </Head>

      {/* Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Music Library</h1>
          <p className="text-xl text-gray-300">Coming Soon!</p>
          <p className="text-gray-400 mt-2">Music support will be available in a future update.</p>
        </div>
      </div>
    </Layout>
  );
}
