"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Activity } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsPlayCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import Layout from "../../../components/Layout";
import { cachedTmdbDetails } from "../../../utils/apiUtils";

interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  runtime?: number;
  number_of_episodes?: number;
  number_of_seasons?: number;
  status: string;
  tagline?: string;
  homepage?: string;
  // Local file properties
  ObjUrl?: string;
  fileName?: string;
  folderPath?: string;
  rootPath?: string;
}

interface MediaDetailPageProps {
  params: Promise<{
    mediaType: string;
    id: string;
  }>;
  searchParams: Promise<{
    ObjUrl?: string;
    fileName?: string;
    folderPath?: string;
    rootPath?: string;
  }>;
}

export default function MediaDetailPage({
  params,
  searchParams,
}: MediaDetailPageProps) {
  const router = useRouter();
  const { mediaType, id } = use(params);
  const resolvedSearchParams = use(searchParams);

  const [mediaDetails, setMediaDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // Validate required parameters
    if (!mediaType || !id) {
      setValidationError(
        `Missing required parameters: mediaType=${mediaType}, id=${id}`
      );
      setLoading(false);
      return;
    }

    if (!["movie", "tv"].includes(mediaType)) {
      setValidationError(
        `Invalid media type: ${mediaType}. Expected 'movie' or 'tv'`
      );
      setLoading(false);
      return;
    }

    // Clear any previous validation errors
    setValidationError(null);

    const fetchMediaDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const details = await cachedTmdbDetails(
          parseInt(id),
          mediaType as "movie" | "tv"
        );
        // Include local file properties from search params
        setMediaDetails({
          ...details,
          ObjUrl: resolvedSearchParams.ObjUrl,
          fileName: resolvedSearchParams.fileName,
          folderPath: resolvedSearchParams.folderPath,
          rootPath: resolvedSearchParams.rootPath,
        });
      } catch (err) {
        console.error("Error fetching media details:", err);
        setError("Failed to load media details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [mediaType, id, searchParams, router]);

  // Calculate backdrop URL early for use in loading/error states
  const backdropUrl = mediaDetails?.backdrop_path
    ? `https://www.themoviedb.org/t/p/original${mediaDetails.backdrop_path}`
    : null;
  const title = mediaDetails?.title || mediaDetails?.name || "Media";

  const handleBackClick = () => {
    router.back();
  };

  // Show validation error if parameters are invalid
  if (validationError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Route Error</h1>
          <p className="mb-4">{validationError}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#CC7B19] text-white px-4 py-2 rounded hover:bg-[#B86E17] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative">
        {/* Background - just solid color during loading */}
        <div className="fixed inset-0 z-0 bg-gray-800"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CC7B19] mx-auto mb-4"></div>
            <p>Loading media details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !mediaDetails) {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative">
        {/* Background - just solid color during error */}
        <div className="fixed inset-0 z-0 bg-gray-800"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-400 mb-4">
              <BsArrowLeft
                className="text-3xl cursor-pointer hover:text-[#CC7B19] mx-auto mb-4"
                onClick={handleBackClick}
              />
              <h1 className="text-2xl font-bold mb-2">Error</h1>
              <p>{error || "Media not found"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const releaseDate = mediaDetails.release_date || mediaDetails.first_air_date;
  const posterUrl = mediaDetails.poster_path
    ? `https://www.themoviedb.org/t/p/w500${mediaDetails.poster_path}`
    : null;

  return (
    <Layout showMenu={false} showBackground={false}>
      {/* Full Page Background Image - Using Activity for conditional rendering */}
      <Activity mode={backdropUrl ? "visible" : "hidden"}>
        <div className="fixed inset-0 z-0">
          <Image
            src={backdropUrl || "/placeholder-backdrop.jpg"}
            alt={`${title} backdrop`}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={
              backdropUrl
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${mediaDetails.backdrop_path}`
                : undefined
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </Activity>

      <main className="relative z-10 h-[calc(100vh-128px)] overflow-y-auto">
        <div className="px-8 py-6 bg-gray-900/90">
          {/* Back Button */}
          <Link
            href="/"
            className="px-4 pb-4 flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 mt-4"
          >
            <BsArrowLeft className="text-xl" />
            Back
          </Link>

          <div className="flex gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 px-4">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={`${title} poster`}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-lg"
                  priority
                />
              ) : (
                <div className="w-[300px] h-[450px] bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No poster available</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 px-4">
              {/* Title and Play Button */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{title}</h1>
                  {mediaDetails.tagline && (
                    <p className="text-xl text-gray-300 italic mb-4">
                      {mediaDetails.tagline}
                    </p>
                  )}
                </div>
                {/* Mini Video Thumbnail */}
                <div className="w-48 h-32 rounded-lg overflow-hidden shadow-lg">
                  {mediaDetails?.ObjUrl || mediaDetails?.fileName ? (
                    <ReactPlayer
                      src={mediaDetails.ObjUrl || mediaDetails.fileName}
                      controls={false}
                      width="100%"
                      height="100%"
                      playing={true}
                      muted={true}
                      loop={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg">
                      <BsPlayCircleFill className="text-gray-400 text-2xl" />
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-gray-800 px-3 py-1 rounded">
                  <span className="text-[#CC7B19] font-semibold">
                    {Math.round(mediaDetails.vote_average * 10) / 10}
                  </span>
                  <span className="text-gray-400">
                    /10 ({mediaDetails.vote_count} votes)
                  </span>
                </div>
                {releaseDate && (
                  <div className="bg-gray-800 px-3 py-1 rounded">
                    {new Date(releaseDate).getFullYear()}
                  </div>
                )}
                {mediaDetails.runtime && (
                  <div className="bg-gray-800 px-3 py-1 rounded">
                    {mediaDetails.runtime} min
                  </div>
                )}
                {mediaDetails.number_of_seasons && (
                  <div className="bg-gray-800 px-3 py-1 rounded">
                    {mediaDetails.number_of_seasons} season
                    {mediaDetails.number_of_seasons !== 1 ? "s" : ""}
                  </div>
                )}
                {mediaDetails.number_of_episodes && (
                  <div className="bg-gray-800 px-3 py-1 rounded">
                    {mediaDetails.number_of_episodes} episode
                    {mediaDetails.number_of_episodes !== 1 ? "s" : ""}
                  </div>
                )}
                <div className="bg-gray-800 px-3 py-1 rounded">
                  {mediaDetails.status}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mediaDetails.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-3">Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  {mediaDetails.overview}
                </p>
              </div>

              {/* Additional Info */}
              {mediaDetails.homepage && (
                <div className="mb-4">
                  <a
                    href={mediaDetails.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#CC7B19] hover:text-[#B86E17] transition-colors"
                  >
                    Official Website →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
