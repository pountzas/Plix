"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Activity } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsImage } from "react-icons/bs";
import ReactPlayer from "react-player";
import Layout from "../../../components/Layout";
import { cachedTmdbDetails } from "../../../utils/apiUtils";
import {
  getMovieCredits,
  getTvCredits,
  getTvDetails,
  getSeasonEpisodes,
} from "../../../utils/tmdbApi";
import { useMediaStore } from "../../../stores/mediaStore";

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

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
}

interface CreditsData {
  cast: CastMember[];
  crew: Array<{
    id: number;
    name: string;
    job: string;
    department: string;
  }>;
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

// Actor image component with fallback handling
const ActorImage = ({
  actor,
  size = 80,
}: {
  actor: CastMember;
  size?: number;
}) => {
  const [imageError, setImageError] = useState(false);
  const hasValidProfile =
    actor.profile_path && actor.profile_path.trim() !== "";
  const imageSrc = hasValidProfile
    ? `https://www.themoviedb.org/t/p/w220_and_h330_face${actor.profile_path}`
    : null;

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageSrc && !imageError) {
    return (
      <Image
        className="rounded-full shadow-xl object-cover"
        src={imageSrc}
        alt={actor.name}
        width={size}
        height={size}
        loading="lazy"
        quality={75}
        onError={handleImageError}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600"
      style={{ width: size, height: size }}
    >
      <BsImage className="text-gray-400 text-xl" />
    </div>
  );
};

export default function MediaDetailPage({
  params,
  searchParams,
}: MediaDetailPageProps) {
  const router = useRouter();
  const { mediaType, id } = use(params);
  const resolvedSearchParams = use(searchParams);

  // Session store for uploaded files
  const { getSessionMovie, getSessionTvShow, persistedTvShows } =
    useMediaStore();

  const [mediaDetails, setMediaDetails] = useState<MediaDetails | null>(null);
  const [credits, setCredits] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TV series specific state
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const [currentEpisodeFile, setCurrentEpisodeFile] = useState<any>(null);
  const [, setMissingEpisodes] = useState<
    { season: number; episode: number; title?: string }[]
  >([]);

  // TMDB TV series data
  const [tmdbSeasons, setTmdbSeasons] = useState<any[]>([]);
  const [tmdbEpisodesBySeason, setTmdbEpisodesBySeason] = useState<{
    [season: number]: any[];
  }>({});

  // Handle clicking on cast member names to navigate to person profile
  const handleCastMemberClick = (personId: number) => {
    router.push(`/person/${personId}`);
  };
  const [validationError, setValidationError] = useState<string | null>(null);

  // Local episodes management (existing files)
  const [localEpisodesBySeason, setLocalEpisodesBySeason] = useState<{
    [season: number]: any[];
  }>({});

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
    setSelectedEpisode(1); // Reset to first episode of new season

    // Update current episode file based on local files
    const seasonEpisodes = localEpisodesBySeason[season];
    if (seasonEpisodes && seasonEpisodes.length > 0) {
      setCurrentEpisodeFile(seasonEpisodes[0]);
    } else {
      setCurrentEpisodeFile(null);
    }

    // Update missing episodes for selected season
    updateMissingEpisodesForSeason(season);
  };

  const handleEpisodeChange = (episode: number) => {
    setSelectedEpisode(episode);

    // Update current episode file based on local files
    const seasonEpisodes = localEpisodesBySeason[selectedSeason];
    if (seasonEpisodes) {
      const episodeFile = seasonEpisodes.find(
        (ep) => ep.episodeNumber === episode
      );
      if (episodeFile) {
        setCurrentEpisodeFile(episodeFile);
      } else {
        setCurrentEpisodeFile(null);
      }
    }
  };

  const updateMissingEpisodesForSeason = (seasonNumber: number) => {
    const tmdbEpisodes = tmdbEpisodesBySeason[seasonNumber] || [];
    const localEpisodes = localEpisodesBySeason[seasonNumber] || [];

    // Create a set of local episode numbers for quick lookup
    const localEpisodeNumbers = new Set(
      localEpisodes.map((ep) => ep.episodeNumber).filter((n) => n)
    );

    // Find missing episodes for this season
    const missing = tmdbEpisodes
      .filter((tmdbEp: any) => !localEpisodeNumbers.has(tmdbEp.episode_number))
      .map((tmdbEp: any) => ({
        season: seasonNumber,
        episode: tmdbEp.episode_number,
        title: tmdbEp.name,
      }));

    setMissingEpisodes(missing);
  };

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

        // Fetch media details and credits in parallel
        const [details, creditsData] = await Promise.all([
          cachedTmdbDetails(parseInt(id), mediaType as "movie" | "tv"),
          mediaType === "movie"
            ? getMovieCredits(parseInt(id))
            : getTvCredits(parseInt(id)),
        ]);

        // Include local file properties from session store or search params
        const sessionData =
          mediaType === "movie"
            ? getSessionMovie(parseInt(id))
            : getSessionTvShow(parseInt(id));

        // For TV series, fetch TMDB data and set up episode navigation
        if (mediaType === "tv") {
          try {
            // Fetch complete TV series details including all seasons
            const tvDetails = await getTvDetails(parseInt(id));
            const seasons = tvDetails.seasons || [];

            // Filter out specials (season_number === 0) and sort seasons
            const validSeasons = seasons
              .filter((season: any) => season.season_number > 0)
              .sort((a: any, b: any) => a.season_number - b.season_number);

            setTmdbSeasons(validSeasons);

            // Fetch episodes for all seasons
            const episodesBySeasonData: { [season: number]: any[] } = {};
            for (const season of validSeasons) {
              try {
                const seasonData = await getSeasonEpisodes(
                  parseInt(id),
                  season.season_number
                );
                episodesBySeasonData[season.season_number] =
                  seasonData.episodes || [];
              } catch (error) {
                console.error(
                  `Error fetching episodes for season ${season.season_number}:`,
                  error
                );
                episodesBySeasonData[season.season_number] = [];
              }
            }
            setTmdbEpisodesBySeason(episodesBySeasonData);

            // Find local episodes for this TV series
            const seriesEpisodes = persistedTvShows.filter(
              (tv) => tv.tmdbId === parseInt(id)
            );

            console.log(
              `Found ${seriesEpisodes.length} local episodes for TV series ID ${id}`
            );

            // Group local episodes by season
            const localEpisodesGrouped: { [season: number]: any[] } = {};
            seriesEpisodes.forEach((episode) => {
              const season = episode.seasonNumber || 1;
              if (!localEpisodesGrouped[season]) {
                localEpisodesGrouped[season] = [];
              }
              localEpisodesGrouped[season].push(episode);
            });

            // Sort local episodes within each season
            Object.keys(localEpisodesGrouped).forEach((season) => {
              localEpisodesGrouped[parseInt(season)].sort(
                (a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0)
              );
            });

            setLocalEpisodesBySeason(localEpisodesGrouped);

            // Set initial season (first available season with episodes or first TMDB season)
            const availableSeasons = Object.keys(localEpisodesGrouped)
              .map((s) => parseInt(s))
              .sort((a, b) => a - b);

            let initialSeason = 1;
            if (availableSeasons.length > 0) {
              initialSeason = availableSeasons[0];
            } else if (validSeasons.length > 0) {
              initialSeason = validSeasons[0].season_number;
            }

            setSelectedSeason(initialSeason);

            // Set initial episode
            const localSeasonEpisodes = localEpisodesGrouped[initialSeason];
            if (localSeasonEpisodes && localSeasonEpisodes.length > 0) {
              setSelectedEpisode(localSeasonEpisodes[0].episodeNumber || 1);
              setCurrentEpisodeFile(localSeasonEpisodes[0]);
            } else {
              setSelectedEpisode(1);
              setCurrentEpisodeFile(null);
            }

            // Update missing episodes for initial season
            updateMissingEpisodesForSeason(initialSeason);
          } catch (error) {
            console.error("Error fetching TV series data:", error);
          }
        }

        setMediaDetails({
          ...details,
          ObjUrl: sessionData?.ObjUrl || resolvedSearchParams.ObjUrl,
          fileName: sessionData?.fileName || resolvedSearchParams.fileName,
          folderPath:
            sessionData?.folderPath || resolvedSearchParams.folderPath,
          rootPath: sessionData?.rootPath || resolvedSearchParams.rootPath,
        });

        // Set credits data
        setCredits(creditsData);
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
        <div className="fixed inset-0 z-0 ">
          <Image
            src={backdropUrl || "/placeholder-backdrop.jpg"}
            alt={`${title} backdrop`}
            fill
            className="object-cover"
            priority
            {...(backdropUrl && {
              placeholder: "blur" as const,
              blurDataURL: `https://www.themoviedb.org/t/p/w220_and_h330_face${mediaDetails.backdrop_path}`,
            })}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </Activity>

      <main className="relative z-10 overflow-y-auto scrollbar-hide">
        <div className="px-8 py-3 bg-gray-900/90">
          {/* Back Button */}
          <Link
            href="/"
            className="px-4 pb-4 flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
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
                  width={250}
                  height={375}
                  className="rounded-lg shadow-lg"
                  priority
                />
              ) : (
                <div className="w-[200px] h-[300px] bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No poster available</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 px-4 flex flex-col justify-between">
              {/* Title and Play Button */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{title}</h1>

                  {/* TV Series Episode Navigation */}
                  {mediaType === "tv" && tmdbSeasons.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {/* <label className="text-gray-300 text-sm">Season:</label> */}
                        <select
                          value={selectedSeason}
                          onChange={(e) =>
                            handleSeasonChange(parseInt(e.target.value))
                          }
                          className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:border-[#CC7B19] focus:outline-none"
                        >
                          {tmdbSeasons.map((season) => (
                            <option
                              key={season.season_number}
                              value={season.season_number}
                            >
                              Season {season.season_number}
                              {season.name !== `Season ${season.season_number}`
                                ? ` - ${season.name}`
                                : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* <label className="text-gray-300 text-sm">
                          Episode:
                        </label> */}
                        <select
                          value={selectedEpisode}
                          onChange={(e) =>
                            handleEpisodeChange(parseInt(e.target.value))
                          }
                          className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:border-[#CC7B19] focus:outline-none"
                        >
                          {tmdbEpisodesBySeason[selectedSeason]?.map(
                            (episode) => {
                              const localEpisode = localEpisodesBySeason[
                                selectedSeason
                              ]?.find(
                                (localEp) =>
                                  localEp.episodeNumber ===
                                  episode.episode_number
                              );
                              const hasLocalFile = !!localEpisode;
                              const hasVideo = localEpisode?.hasVideo;
                              const hasSubtitles = localEpisode?.hasSubtitles;

                              let statusText = "";
                              if (hasLocalFile) {
                                const parts = [];
                                if (hasVideo) parts.push("🎥");
                                if (hasSubtitles) parts.push("📝");
                                statusText = ` ${parts.join(" ")}`;
                              } else {
                                statusText = " (not downloaded)";
                              }

                              return (
                                <option
                                  key={episode.episode_number}
                                  value={episode.episode_number}
                                  className={
                                    hasLocalFile
                                      ? "text-white"
                                      : "text-gray-400"
                                  }
                                >
                                  Episode {episode.episode_number}:{" "}
                                  {episode.name}
                                  {statusText}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>

                      <div className="text-sm text-gray-400">
                        {currentEpisodeFile?.fileName ? (
                          <div className="flex flex-col">
                            <span className="text-green-600">
                              ✓{/* {currentEpisodeFile.fileName} */}
                            </span>
                            {currentEpisodeFile.relatedFiles &&
                              currentEpisodeFile.relatedFiles.length > 1 && (
                                <span className="text-xs text-gray-500">
                                  + {currentEpisodeFile.relatedFiles.length - 1}{" "}
                                  related file
                                  {currentEpisodeFile.relatedFiles.length -
                                    1 !==
                                  1
                                    ? "s"
                                    : ""}
                                  {currentEpisodeFile.hasVideo && " 🎥"}
                                  {currentEpisodeFile.hasSubtitles && " 📝"}
                                </span>
                              )}
                          </div>
                        ) : (
                          <span className="text-yellow-400">
                            No local files for this episode
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Missing Episodes Notification */}
                  {/* {mediaType === "tv" && missingEpisodes.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-800/80 border border-gray-600 rounded-lg shadow-lg">
                      <h4 className="text-yellow-400 font-medium mb-3 flex items-center gap-2">
                        <span className="text-lg">📁</span>
                        Missing Episodes (Season {selectedSeason})
                      </h4>
                      <div className="text-sm text-gray-300 space-y-2 max-h-32 overflow-y-auto">
                        {missingEpisodes.map((ep, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-2 bg-gray-700/50 rounded border-l-2 border-yellow-500"
                          >
                            <span className="text-yellow-400 font-medium min-w-[60px]">
                              S{ep.season}E{String(ep.episode).padStart(2, "0")}
                            </span>
                            <span className="flex-1">
                              {ep.title || `Episode ${ep.episode}`}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-gray-400">
                        {missingEpisodes.length} episode
                        {missingEpisodes.length !== 1 ? "s" : ""} missing from
                        this season
                      </div>
                    </div>
                  )} */}

                  {mediaDetails.tagline && (
                    <p className="text-xl text-gray-300 italic mb-4">
                      {mediaDetails.tagline}
                    </p>
                  )}
                </div>
                {/* Mini Video Thumbnail */}
                <div className="w-48 h-32 rounded-lg overflow-hidden shadow-lg">
                  {currentEpisodeFile?.ObjUrl || mediaDetails?.ObjUrl ? (
                    <ReactPlayer
                      key={currentEpisodeFile?.ObjUrl || mediaDetails?.ObjUrl} // Force recreation when source changes
                      src={currentEpisodeFile?.ObjUrl || mediaDetails.ObjUrl}
                      controls={false} // Remove controls for thumbnail
                      width="100%"
                      height="100%"
                      playing={false} // Don't auto-play thumbnail
                      muted={true}
                      loop={false}
                      playsInline={true}
                      onError={(error: any) => {
                        // Only log actual errors, not empty objects or synthetic events
                        if (
                          error &&
                          typeof error === "object" &&
                          Object.keys(error).length > 0
                        ) {
                          console.warn("ReactPlayer thumbnail error:", error);
                        }
                        // Don't log synthetic React events or empty errors
                      }}
                      style={{
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-lg border-2 border-gray-600">
                      <div className="text-center text-gray-400 p-6">
                        <BsImage className="text-3xl mx-auto mb-2" />
                        <p className="text-xs">Video not available</p>
                        <p className="text-xs">Upload from local files</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                {/* Metadata */}
                <div className="flex flex-wrap space-x-4 mb-6 text-sm pb-4">
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
                <div className="flex flex-wrap space-x-2 mb-6">
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
        </div>

        {/* Cast Section */}
        {credits?.cast && credits.cast.length > 0 && (
          <div className="px-2">
            {/* <h2 className="text-2xl font-bold mb-2">Cast</h2> */}
            <div className="flex object-contain w-full pb-4 pl-3 overflow-hidden overflow-x-scroll space-x-7 scrollbar-track-gray-800 scrollbar-thumb-black scrollbar-thin">
              {credits.cast.slice(0, 20).map((actor) => (
                <div
                  key={actor.id}
                  className="flex flex-col items-center space-y-3 flex-shrink-0 w-48 h-64 cursor-pointer group"
                  onClick={() => handleCastMemberClick(actor.id)}
                >
                  <div className="flex items-center justify-center p-2 bg-gray-800 group-hover:bg-[#CC7B19] rounded-full transition-colors">
                    <ActorImage actor={actor} size={100} />
                  </div>
                  <div className="flex flex-col items-center text-center space-y-1 px-2 h-20 overflow-hidden">
                    <div className="text-gray-200 group-hover:text-blue-400 text-sm font-medium leading-tight overflow-hidden text-ellipsis whitespace-nowrap w-full transition-colors">
                      {actor.name}
                    </div>
                    <div className="text-gray-400 text-xs leading-tight overflow-hidden text-ellipsis whitespace-nowrap w-full">
                      {actor.character}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
