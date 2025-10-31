import Head from "next/head";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import MediaModal from "../components/MediaModal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useVisualStore } from "../stores/visualStore";
import { useNavigationStore } from "../stores/navigationStore";
import Image from "next/image";
import SliderBgOpacity from "../components/props/SliderBgOpacity";

export default function Home() {
  const { data: session } = useSession();
  const backgroundImageUrl = useVisualStore(
    (state) => state.backgroundImageUrl
  );
  const imageVisible = useVisualStore((state) => state.imageVisible);
  const movieMenuActive = useNavigationStore((state) => state.movieMenuActive);
  const backgroundOpacity = useVisualStore((state) => state.backgroundOpacity);
  const [imageOpacityStyles, setImageOpacityStyles] = useState("");

  useEffect(() => {
    setImageOpacityStyles(SliderBgOpacity[backgroundOpacity]);
    console.log(imageOpacityStyles + "bgOpacity");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundOpacity]);

  return (
    <div
      className={`relative bg-gradient-to-bl from-[#2A3440] to-[#323C45] min-w-[100vw] min-h-[100vh]`}
    >
      <div
        className={`absolute min-w-full ${
          movieMenuActive
            ? !imageVisible
              ? `max-h-[90vh] bg-gradient-to-bl from-[#2A3440] to-[#323C45]`
              : `min-h-screen `
            : `min-h-screen `
        }`}
      >
        {imageVisible && (
          <div>
            <Image
              className={`z-0 ${imageOpacityStyles} min-w-full min-h-screen`}
              src={`https://www.themoviedb.org/t/p/original${backgroundImageUrl}`}
              alt=""
              layout="fill"
              objectFit="cover"
              loading="lazy"
              placeholder={`blur`}
              blurDataURL={`https://www.themoviedb.org/t/p/w220_and_h330_face${backgroundImageUrl}`}
            />
          </div>
        )}
      </div>
      <div className="z-2 absolute w-full">
        <Head>
          <title>Plix</title>
          <meta name="Plix" content="next app" />
          <link rel="icon" href="/Plex.ico" />
        </Head>
        <Header />
        {session && <Dashboard />}

        {/* MediaModal */}
        <MediaModal />
      </div>
    </div>
  );
}
