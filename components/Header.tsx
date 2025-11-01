import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useRef, useEffect, useState } from "react";

import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";
import { useVisualStore } from "../stores/visualStore";

import MovieFiles from "./props/MovieFiles";
import MediaItemProps from "./props/MediaItemProps";

import { VscMenu } from "react-icons/vsc";
import { FiActivity, FiTool, FiCast, FiSearch } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

interface SearchResult {
  id: number;
  name: string;
  tmdbPoster: string;
  tmdbTitle: string;
  backdrop_path: string;
}

function Header() {
  const { data: session } = useSession();

  const menuSize = useUiStore((state) => state.menuSize);
  const setMenuSize = useUiStore((state) => state.setMenuSize);
  const setBackgroundImageUrl = useVisualStore(
    (state) => state.setBackgroundImageUrl
  );
  const imageVisible = useVisualStore((state) => state.imageVisible);
  const setImageVisible = useVisualStore((state) => state.setImageVisible);
  const setMediaItemActive = useMediaStore((state) => state.setMediaItemActive);

  // Local state for search results to trigger re-renders
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleMenuSize = () => {
    setMenuSize(!menuSize);
  };

  const openMedia = (mediaId: number) => {
    const media = searchResults.filter((movie) => {
      return movie.id === mediaId;
    });
    setMediaItemActive(true);
    Object.assign(MediaItemProps, media[0]);
    setSearchResults([]); // Clear search results using state
    setBackgroundImageUrl(media[0]?.backdrop_path || "");
    setImageVisible(true);
  };

  // Debounced search implementation to prevent excessive filtering on every keystroke
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback((searchValue: string) => {
    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = MovieFiles.filter((movie) => {
      return movie.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setSearchResults(results.slice(0, 10));
  }, []);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new debounced timeout (300ms delay)
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 300);
    },
    [performSearch]
  );

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="px-3 pt-3 w-full">
      <div
        className={`bg-[#232B35] rounded-md h-16 p-3 text-white font-semibold flex items-center justify-between
            ${!session && "w-[97vw]"} ${imageVisible && "opacity-75"}`}
      >
        <div className="flex items-center justify-start">
          <VscMenu
            onClick={handleMenuSize}
            className="inline-block mr-8 text-2xl text-gray-400"
          />
          <Image
            src="https://res.cloudinary.com/dcwuuolk8/image/upload/v1650308268/Plix/plix-logo-w_yrxkmt.png"
            alt="logo"
            height={20}
            width={60}
          />
          <div className="relative flex items-center">
            <div className="bg-[#333A44] px-2 ml-8 py-2 rounded-l-2xl">
              <FiSearch className="ml-2 text-2xl text-gray-500" />
            </div>
            <input
              onChange={handleSearch}
              className="bg-[#333A44] rounded-r-2xl py-2 border-none mr-8 text-white font-semibold outline-none flex-grow"
              type="text"
              name="search"
              id=""
            />
            {searchResults.length > 0 && (
              <ul className="absolute z-30 w-full mt-2 border border-gray-800 rounded top-8 left-20">
                {searchResults.map((result) => (
                  <li
                    onClick={() => openMedia(result.id)}
                    key={result.id}
                    className="cursor-pointer flex items-center space-x-4 hover:bg-[#232B35] bg-[#333A44] rounded py-1 px-4 font-semibold text-gray-200"
                  >
                    <Image
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.tmdbPoster}`}
                      alt={result.tmdbTitle}
                      height={50}
                      width={32}
                    />

                    <div>{result.name}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center justify-start space-x-4">
          {session ? (
            <button className="cursor-pointer hidden lg:inline-block bg-[#CC7B19] rounded-md py-1 px-4 font-bold text-orange-200 text-xl">
              GO PREMIUM
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="cursor-pointer hidden lg:inline-block bg-[#CC7B19] rounded-md py-1 px-4 font-bold text-orange-200 text-xl"
            >
              Sign in
            </button>
          )}
          <div>
            <FiActivity className="hidden mr-4 text-3xl text-gray-400 md:inline-block" />
          </div>
          <div>
            <FiTool className="hidden mr-4 text-3xl text-gray-400 md:inline-block" />
          </div>
          <div>
            <FiCast className="hidden mr-4 text-3xl text-gray-400 md:inline-block" />
          </div>
          {session?.user ? (
            <Image
              onClick={() => signOut()}
              className="mr-4 rounded-full"
              src={session.user.image || ""}
              alt="logo"
              height={30}
              width={30}
            />
          ) : (
            <BsPersonCircle className="mr-4 text-3xl text-gray-200" />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
