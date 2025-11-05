"use client";

import { Activity } from "react";
import { useUiStore } from "../stores/uiStore";
import { useMediaStore } from "../stores/mediaStore";

import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { VscListSelection } from "react-icons/vsc";
import { FaFolderOpen } from "react-icons/fa";
import { BsFilm, BsGearFill } from "react-icons/bs";
import { MdMonitor } from "react-icons/md";
import { HiOutlineMusicNote } from "react-icons/hi";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import MovieFiles from "./props/MovieFiles";
import TvFiles from "./props/TvFiles";
import { MovieFile, TvFile } from "./props/types";
import { cachedTmdbSearch } from "../utils/apiUtils";
import { useApiErrorHandler } from "../hooks/useApiErrorHandler";
import { useMediaPersistence } from "../hooks/useMediaPersistence";

/**
 * Clean TV show name by removing years, resolution, source, codec, and release group
 */
function cleanShowName(showName: string): string {
  let cleaned = showName
    .replace(/[._]/g, " ") // Replace dots/underscores with spaces
    .replace(/\s+/g, " ") // Normalize multiple spaces
    .trim();

  // Remove years (4-digit numbers between 1900-2100)
  cleaned = cleaned.replace(/\b(19|20)\d{2}\b/g, "").trim();

  // Remove common metadata patterns
  const metadataPatterns = [
    /\b\d{3,4}p\b/i, // Resolution: 720p, 1080p, etc.
    /\b(WEBDL|WEBRip|BluRay|DVD|DVDRip|HDTV|WEB|BRRip|BDRip|HDRip)\b/i, // Sources
    /\b(x264|x265|h264|h265|XviD|DivX|AVC|HEVC)\b/i, // Codecs
    /\b[A-Z]{3,8}\b/g, // Release groups (typically 3-8 uppercase letters)
  ];

  metadataPatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, "").trim();
  });

  // Clean up any double spaces created by removals
  return cleaned.replace(/\s+/g, " ").trim();
}

/**
 * Extract TV show name, season, and episode information from filename
 */
function extractTvShowInfo(filename: string): {
  name: string;
  seasonNumber?: number;
  episodeNumber?: number;
  episodeTitle?: string;
} {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

  // Various regex patterns for season/episode extraction
  const patterns = [
    // S01E01, s01e01, S1E1, s1e1
    /^(.+?)[._\s-]+[Ss](\d{1,2})[Ee](\d{1,2})[._\s-]*(.*?)$/i,
    // 1x01, 01x01
    /^(.+?)[._\s-]+(\d{1,2})[xX](\d{1,2})[._\s-]*(.*?)$/i,
    // Season 1 Episode 1, Season 01 Episode 01
    /^(.+?)[._\s-]*[Ss]eason\s*(\d{1,2})[._\s-]*[Ee]pisode\s*(\d{1,2})[._\s-]*(.*?)$/i,
    // 1.01, 01.01
    /^(.+?)[._\s-]+(\d{1,2})\.(\d{1,2})[._\s-]*(.*?)$/i,
  ];

  for (const pattern of patterns) {
    const match = nameWithoutExt.match(pattern);
    if (match) {
      const [, showName, seasonStr, episodeStr, episodeTitle] = match;
      const seasonNumber = parseInt(seasonStr, 10);
      const episodeNumber = parseInt(episodeStr, 10);

      // Clean up the show name (remove years and metadata)
      const cleanName = cleanShowName(showName);

      return {
        name: cleanName,
        seasonNumber,
        episodeNumber,
        episodeTitle: episodeTitle ? episodeTitle.trim() : undefined,
      };
    }
  }

  // Fallback: try to extract just season/episode info even if pattern doesn't match perfectly
  const fallbackMatch = nameWithoutExt.match(
    /(.+?)[._\s-]+(?:[Ss](\d{1,2})[Ee](\d{1,2})|(\d{1,2})[xX](\d{1,2}))[._\s-]*(.*?)$/i
  );
  if (fallbackMatch) {
    const [, showName, s1, e1, s2, e2, episodeTitle] = fallbackMatch;
    const seasonNumber = s1
      ? parseInt(s1, 10)
      : s2
      ? parseInt(s2, 10)
      : undefined;
    const episodeNumber = e1
      ? parseInt(e1, 10)
      : e2
      ? parseInt(e2, 10)
      : undefined;

    // Clean up the show name (remove years and metadata)
    const cleanName = cleanShowName(showName);

    return {
      name: cleanName,
      seasonNumber,
      episodeNumber,
      episodeTitle: episodeTitle ? episodeTitle.trim() : undefined,
    };
  }

  // Last resort: just clean the filename
  const cleanName = cleanShowName(nameWithoutExt);

  return {
    name: cleanName,
  };
}

// Cache TMDB results to ensure consistency across episodes of the same show
const tmdbShowCache = new Map<string, any>();

function MediaModal() {
  const { data: session } = useSession();
  const modalOpen = useUiStore((state) => state.modalOpen);
  const setModalOpen = useUiStore((state) => state.setModalOpen);
  const setHomeMovieLoaded = useMediaStore((state) => state.setHomeMovieLoaded);
  const setHomeTvLoaded = useMediaStore((state) => state.setHomeTvLoaded);
  const [typeSection, setTypeSection] = useState(true);
  const [folderLoadSection, setFolderLoadSection] = useState(false);
  const [advancedSection, setAdvancedSection] = useState(false);
  const [movieLibrary, setMovieLibrary] = useState(false);
  const [tvLibrary, setTvLibrary] = useState(false);
  const [musicLibrary, setMusicLibrary] = useState(false);
  const [ok, setOk] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { handleApiError } = useApiErrorHandler();
  const {
    saveMoviesToCollectionWithFiles,
    saveTvShowsToCollectionWithFiles,
    isAuthenticated,
  } = useMediaPersistence();

  // Session store actions for uploaded files
  const {
    addSessionMovie,
    addSessionTvShow,
    addPersistedMovie,
    addPersistedTvShow,
  } = useMediaStore();

  const folderPickerRef = useRef<HTMLInputElement>(null);

  // Track original files for persistence
  const [originalFiles, setOriginalFiles] = useState<Map<string, File>>(
    new Map()
  );

  const handleClose = () => {
    setModalOpen(false);
    setMovieLibrary(false);
    setTvLibrary(false);
    setMusicLibrary(false);
    setTypeSection(true);
    setFolderLoadSection(false);
    setAdvancedSection(false);
  };

  const showLatestMovies = () => {
    setHomeMovieLoaded(true);
    handleClose();
  };

  const showLatestTv = () => {
    setHomeTvLoaded(true);
    handleClose();
  };

  const addFolderUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    console.log("=== FOLDER SCAN DEBUG ===");
    console.log(`Total files received: ${files?.length || 0}`);

    if (files) {
      // Debug: Log all files received
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`File ${i}: ${file.name}`, {
          type: file.type,
          size: file.size,
          webkitRelativePath: (file as any).webkitRelativePath,
          path: (file as any).path,
          isVideo: file.type.includes("video"),
          isDirectory: file.type === "" && file.size === 0,
        });
      }

      setIsProcessing(true);
      setIsSaving(false);
      setTotalFiles(files.length);
      setProcessedCount(0);

      // Arrays to collect processed media for batch saving
      const processedMovies: MovieFile[] = [];
      const processedTvShows: TvFile[] = [];

      // File inventory for TV series - tracks all files per series
      const tvSeriesInventory: {
        [seriesName: string]: {
          tmdbData?: any;
          files: {
            [seasonEpisodeKey: string]: {
              seasonNumber?: number;
              episodeNumber?: number;
              videoFiles: File[];
              subtitleFiles: File[];
              episodeTitle?: string;
            };
          };
        };
      } = {};

      console.log(`Processing ${files.length} files...`);

      // Phase 1: Create comprehensive file inventory for ALL TV series files
      console.log("=== PHASE 1: FILE INVENTORY ===");
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Skip directories and non-video files
        if (file.type === "" && file.size === 0) continue;
        if (
          !file.type.includes("video") &&
          !file.name.toLowerCase().endsWith(".srt") &&
          !file.name.toLowerCase().endsWith(".vtt") &&
          !file.name.toLowerCase().endsWith(".sub") &&
          !file.name.toLowerCase().endsWith(".ass")
        )
          continue;

        // Process ALL TV files - both organized folders and individual files
        const tvShowInfo = extractTvShowInfo(file.name);

        if (tvShowInfo.name) {
          const seriesName = tvShowInfo.name;
          const seasonEpisodeKey = `S${tvShowInfo.seasonNumber || 0}E${
            tvShowInfo.episodeNumber || 0
          }`;

          // Initialize series inventory if not exists
          if (!tvSeriesInventory[seriesName]) {
            tvSeriesInventory[seriesName] = {
              files: {},
            };
          }

          // Initialize episode entry if not exists
          if (!tvSeriesInventory[seriesName].files[seasonEpisodeKey]) {
            tvSeriesInventory[seriesName].files[seasonEpisodeKey] = {
              seasonNumber: tvShowInfo.seasonNumber,
              episodeNumber: tvShowInfo.episodeNumber,
              videoFiles: [],
              subtitleFiles: [],
              episodeTitle: tvShowInfo.episodeTitle,
            };
          }

          // Add file to appropriate category
          if (file.type.includes("video")) {
            tvSeriesInventory[seriesName].files[
              seasonEpisodeKey
            ].videoFiles.push(file);
          } else if (
            file.name.toLowerCase().endsWith(".srt") ||
            file.name.toLowerCase().endsWith(".vtt") ||
            file.name.toLowerCase().endsWith(".sub") ||
            file.name.toLowerCase().endsWith(".ass")
          ) {
            tvSeriesInventory[seriesName].files[
              seasonEpisodeKey
            ].subtitleFiles.push(file);
          }

          const fileType = file.type.includes("video") ? "video" : "subtitle";
          const pathType =
            ((file as any).webkitRelativePath || "").includes("/series/") ||
            ((file as any).webkitRelativePath || "").includes("\\series\\")
              ? "organized"
              : "individual";
          console.log(
            `Inventoried: ${seriesName} - ${seasonEpisodeKey} - ${file.name} (${fileType}, ${pathType})`
          );
        }
      }

      console.log("TV Series Inventory:", tvSeriesInventory);

      // Phase 2: Process movies only (TV series handled in Phase 3)
      console.log("=== PHASE 2: PROCESSING MOVIES ===");
      for (let i = 0; i < files.length; i++) {
        setProcessedCount(i + 1);
        const file = files[i];

        console.log(
          `Processing file ${i + 1}/${files.length}: ${file.name} (type: ${
            file.type
          })`
        );

        // Only process video files (movies and non-inventoried TV files)
        if (file.type.includes("video")) {
          // Check if this is a TV file that was already inventoried in Phase 1
          const tvShowInfo = extractTvShowInfo(file.name);
          const isInventoriedTVFile =
            tvShowInfo.name && tvSeriesInventory[tvShowInfo.name];

          if (tvLibrary && isInventoriedTVFile) {
            // Skip TV files that were already inventoried - they'll be processed in Phase 3
            console.log(
              `Skipping inventoried TV file: ${file.name} (processed in Phase 3)`
            );
            continue;
          }

          // Process movie files or non-inventoried TV files
          const nameMatch = file.name.match(
            /^(?!\d\d?[ex]\d\d?)(?:\[(?:[-\w\s]+)*\] )?(.*?)[-_. ]?(?:[\{\(\[]?(?:dvdrip|[-._\b]ita|[-._\b]h264|x264|hdtv|hdtv-lol|web|proper|internal|[-._\b]eng|xvid| cd\d|dvdscr|\w{1,5}rip|divx|\d+p|\d{4}).*?)?\.([\w]{2,3})$/i
          );
          let name = nameMatch?.[1] || "";
          name = name.replace(/\./g, " ");

          if (movieLibrary) {
            if (name) {
              try {
                const data = await cachedTmdbSearch(name, "movie");
                const tmdbId = data?.results[0]?.id;

                if (tmdbId) {
                  const movieFile = {
                    name,
                    tmdbId,
                    adult: data.results[0].adult,
                    backdrop_path: data.results[0]?.backdrop_path,
                    original_language: data.results[0]?.original_language,
                    popularity: data.results[0]?.popularity,
                    vote_average: data.results[0]?.vote_average,
                    vote_count: data.results[0]?.vote_count,
                    tmdbPoster: data.results[0]?.poster_path,
                    tmdbTitle: data.results[0]?.title,
                    tmdbOverview: data.results[0]?.overview,
                    tmdbReleaseDate: data.results[0]?.release_date.substring(
                      0,
                      4
                    ),
                    tmdbRating: data.results[0]?.vote_average,
                    tmdbGenre: data.results[0]?.genre_ids,
                    fileName: files[i].name,
                    ObjUrl: URL.createObjectURL(files[i]), // Blob URL for immediate playback only
                    folderPath: files[i].webkitRelativePath,
                    folderPath2: (files[i] as any).webkitdirectory,
                    rootPath: (files[i] as any).path,
                  };

                  // Store original file for persistence
                  setOriginalFiles(
                    (prev) => new Map(prev.set(movieFile.fileName, files[i]))
                  );

                  // Add to local array for immediate UI feedback
                  MovieFiles.push(movieFile);
                  // Add to session store for navigation
                  addSessionMovie(movieFile);
                  // Collect for batch saving to Firebase
                  processedMovies.push(movieFile);
                } else {
                  console.log(
                    name + " not found " + files[i].webkitRelativePath
                  );
                }
              } catch (error) {
                handleApiError(error);
              }
            }
          }

          // Handle any remaining TV files that weren't inventoried (fallback)
          if (tvLibrary && !isInventoriedTVFile && tvShowInfo.name) {
            console.log(`Processing fallback TV file: ${files[i].name}`);
            console.log(`Extracted info:`, tvShowInfo);

            try {
              let tvShow = tmdbShowCache.get(tvShowInfo.name.toLowerCase());

              if (!tvShow) {
                const data = await cachedTmdbSearch(tvShowInfo.name, "tv");
                console.log(
                  `TMDB search results for "${tvShowInfo.name}":`,
                  data.results?.length || 0,
                  "results"
                );

                if (data.results[0]) {
                  tvShow = data.results[0];
                  tmdbShowCache.set(tvShowInfo.name.toLowerCase(), tvShow);
                  console.log(
                    `Cached TMDB show: "${tvShow.name}" (ID: ${tvShow.id})`
                  );
                }
              }

              if (tvShow) {
                const tvFile = {
                  name: tvShowInfo.name,
                  seasonNumber: tvShowInfo.seasonNumber,
                  episodeNumber: tvShowInfo.episodeNumber,
                  episodeTitle: tvShowInfo.episodeTitle,
                  tmdbId: tvShow.id,
                  backdrop_path: tvShow.backdrop_path,
                  original_language: tvShow.original_language,
                  popularity: tvShow.popularity,
                  vote_average: tvShow.vote_average,
                  vote_count: tvShow.vote_count,
                  tmdbPoster: tvShow.poster_path,
                  tmdbTitle: tvShow.name,
                  tmdbOverview: tvShow.overview,
                  tmdbReleaseDate: tvShow.first_air_date,
                  tmdbRating: tvShow.vote_average,
                  tmdbGenre: tvShow.genre_ids,
                  fileName: file.name,
                  ObjUrl: URL.createObjectURL(file),
                  folderPath: (file as any).webkitRelativePath,
                  folderPath2: (file as any).webkitdirectory,
                  rootPath: (file as any).path,
                  relatedFiles: [file.name],
                  hasVideo: true,
                  hasSubtitles: false,
                };

                setOriginalFiles(
                  (prev) => new Map(prev.set(tvFile.fileName, file))
                );
                TvFiles.push(tvFile);
                addSessionTvShow(tvFile);
                processedTvShows.push(tvFile);

                console.log(
                  `Processed fallback TV episode: S${
                    tvShowInfo.seasonNumber || "?"
                  }E${tvShowInfo.episodeNumber || "?"} - ${tvFile.fileName}`
                );
              }
            } catch (error) {
              console.error(
                `Error processing fallback TV file ${files[i].name}:`,
                error
              );
              handleApiError(error);
            }
          }
        }
      }

      // Phase 3: Process TV series inventory
      console.log("=== PHASE 3: PROCESSING TV SERIES INVENTORY ===");
      if (tvLibrary) {
        for (const [seriesName, seriesData] of Object.entries(
          tvSeriesInventory
        )) {
          console.log(`Processing series: ${seriesName}`);

          try {
            // Get TMDB data for this series
            let tvShow = tmdbShowCache.get(seriesName.toLowerCase());

            if (!tvShow) {
              const data = await cachedTmdbSearch(seriesName, "tv");
              console.log(
                `TMDB search results for "${seriesName}":`,
                data.results?.length || 0,
                "results"
              );

              if (data.results && data.results[0]) {
                tvShow = data.results[0];
                tmdbShowCache.set(seriesName.toLowerCase(), tvShow);
                console.log(
                  `Cached TMDB show: "${tvShow.name}" (ID: ${tvShow.id})`
                );
              }
            } else {
              console.log(
                `Using cached TMDB show: "${tvShow.name}" (ID: ${tvShow.id})`
              );
            }

            if (tvShow) {
              // Store TMDB data in inventory
              seriesData.tmdbData = tvShow;

              // Process each episode that has files
              for (const [seasonEpisodeKey, episodeData] of Object.entries(
                seriesData.files
              )) {
                console.log(
                  `Processing episode: ${seasonEpisodeKey} for ${seriesName}`
                );

                // Create a TvFile record for this episode
                // Use the first video file as the primary file, or first subtitle file if no video
                const primaryFile =
                  episodeData.videoFiles.length > 0
                    ? episodeData.videoFiles[0]
                    : episodeData.subtitleFiles[0];

                if (primaryFile) {
                  // Collect all related filenames
                  const allRelatedFilenames = [
                    ...episodeData.videoFiles.map((f) => f.name),
                    ...episodeData.subtitleFiles.map((f) => f.name),
                  ];

                  const tvFile = {
                    name: seriesName,
                    seasonNumber: episodeData.seasonNumber,
                    episodeNumber: episodeData.episodeNumber,
                    episodeTitle: episodeData.episodeTitle,
                    tmdbId: tvShow.id,
                    backdrop_path: tvShow.backdrop_path,
                    original_language: tvShow.original_language,
                    popularity: tvShow.popularity,
                    vote_average: tvShow.vote_average,
                    vote_count: tvShow.vote_count,
                    tmdbPoster: tvShow.poster_path,
                    tmdbTitle: tvShow.name,
                    tmdbOverview: tvShow.overview,
                    tmdbReleaseDate: tvShow.first_air_date,
                    tmdbRating: tvShow.vote_average,
                    tmdbGenre: tvShow.genre_ids,
                    fileName: primaryFile.name,
                    ObjUrl: URL.createObjectURL(primaryFile), // Blob URL for immediate playback only
                    folderPath: (primaryFile as any).webkitRelativePath,
                    folderPath2: (primaryFile as any).webkitdirectory,
                    rootPath: (primaryFile as any).path,
                    // Enhanced fields for file inventory
                    relatedFiles: allRelatedFilenames,
                    hasVideo: episodeData.videoFiles.length > 0,
                    hasSubtitles: episodeData.subtitleFiles.length > 0,
                  };

                  // Store all related files for persistence
                  const allRelatedFiles = [
                    ...episodeData.videoFiles,
                    ...episodeData.subtitleFiles,
                  ];
                  allRelatedFiles.forEach((file) => {
                    setOriginalFiles(
                      (prev) => new Map(prev.set(file.name, file))
                    );
                  });

                  // Add to local array for immediate UI feedback
                  TvFiles.push(tvFile);
                  // Add to session store for navigation
                  addSessionTvShow(tvFile);
                  // Collect for batch saving to Firebase
                  processedTvShows.push(tvFile);

                  console.log(
                    `Successfully processed episode: ${seasonEpisodeKey} - ${tvFile.fileName} (${episodeData.videoFiles.length} videos, ${episodeData.subtitleFiles.length} subtitles)`
                  );
                }
              }
            } else {
              console.log(`No TMDB results found for series: "${seriesName}"`);
            }
          } catch (error) {
            console.error(`Error processing series ${seriesName}:`, error);
            handleApiError(error);
          }
        }
      }

      // Save processed media to Firebase if user is authenticated
      if (
        isAuthenticated &&
        (processedMovies.length > 0 || processedTvShows.length > 0)
      ) {
        setIsSaving(true);
        try {
          // Save movies and TV shows in parallel with original files
          const savePromises = [];
          if (processedMovies.length > 0) {
            // Associate original files with processed movies
            const moviesWithFiles = processedMovies.map((movie: MovieFile) => ({
              movieFile: movie,
              originalFile: originalFiles.get(movie.fileName),
            }));
            savePromises.push(saveMoviesToCollectionWithFiles(moviesWithFiles));
          }
          if (processedTvShows.length > 0) {
            // Associate original files with processed TV shows
            const tvShowsWithFiles = processedTvShows.map((tvShow: TvFile) => ({
              tvFile: tvShow,
              originalFile: originalFiles.get(tvShow.fileName),
            }));
            savePromises.push(
              saveTvShowsToCollectionWithFiles(tvShowsWithFiles)
            );
          }

          await Promise.all(savePromises);
          console.log(
            `Saved ${processedMovies.length} movies and ${processedTvShows.length} TV shows to collection`
          );
          console.log(
            "TV shows saved:",
            processedTvShows.map((tv) => ({
              name: tv.name,
              season: tv.seasonNumber,
              episode: tv.episodeNumber,
              file: tv.fileName,
            }))
          );

          // Update persisted data in store using proper actions
          if (processedMovies.length > 0) {
            processedMovies.forEach((movie: MovieFile) => {
              const persistedMovie = {
                ...movie,
                userId: (session?.user as any)?.uid || "",
                addedAt: new Date(),
                lastModified: new Date(),
              };
              addPersistedMovie(persistedMovie as any); // Type assertion needed
            });
          }

          if (processedTvShows.length > 0) {
            processedTvShows.forEach((tvShow: TvFile) => {
              const persistedTvShow = {
                ...tvShow,
                userId: (session?.user as any)?.uid || "",
                addedAt: new Date(),
                lastModified: new Date(),
              };
              addPersistedTvShow(persistedTvShow as any); // Type assertion needed
            });
          }
        } catch (error) {
          console.error("Error saving media to collection:", error);
          // Note: Local arrays already updated, so UI will show the media
          // but user will see a persistence error in the store
        } finally {
          setIsSaving(false);
        }
      }

      setIsProcessing(false);
      setOk(true);
    }
  };

  const handleMovieMedia = () => {
    !movieLibrary && setTypeSection(false),
      setFolderLoadSection(true),
      setMovieLibrary(true),
      setTvLibrary(false);
  };

  const handleTvMedia = () => {
    !tvLibrary && setTypeSection(false);
    setFolderLoadSection(true);
    setTvLibrary(true);
    setMovieLibrary(false);
  };

  const handleOk = () => {
    if (ok) {
      if (tvLibrary) {
        showLatestTv();
      } else if (movieLibrary) {
        showLatestMovies();
      }
      setOk(false);
    }
  };

  return (
    <>
      <Activity mode={modalOpen ? "visible" : "hidden"}>
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto text-center justify-items-center backdrop-blur-md">
          <div className="flex flex-col justify-self-center justify-between  bg-[#2D3742] text-white border-gray-900 border-2 min-w-[600px] min-h-[300px] max-w-[800px] max-h-[500px] rounded-lg">
            {/* modal header  */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 text-gray-400 bg-gray-800">
              <div className="flex items-center space-x-2">
                <AiOutlinePlus />
                <h2>Add Library</h2>
              </div>
              <button className="" onClick={handleClose}>
                <AiOutlineCloseCircle className="text-2xl" />
              </button>
            </div>
            <div className="flex pr-2">
              {/* modal menu */}
              <div className="space-y-6 min-w-[200px] min-h-[35vh] p-4">
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${
                    !typeSection
                      ? "text-gray-400"
                      : "text-[#CC7B19] font-semibold"
                  }`}
                >
                  <VscListSelection className="text-2xl" />
                  <p>Select type</p>
                </button>
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${
                    !folderLoadSection
                      ? "text-gray-400"
                      : "text-[#CC7B19] font-semibold"
                  }`}
                >
                  <FaFolderOpen className="text-2xl" />
                  <p>Add folders</p>
                </button>
                <button
                  className={`flex items-center space-x-3 cursor-pointer ${
                    !advancedSection
                      ? "text-gray-400"
                      : "text-[#CC7B19] font-semibold"
                  }`}
                >
                  <BsGearFill className="text-2xl" />
                  <p>Advanced</p>
                </button>
              </div>
              {/* modal menu options */}
              <div className="flex flex-col justify-start">
                {/* select library type section */}
                <div>
                  <p className="pt-4 font-semibold text-gray-400">
                    Select library type
                  </p>
                  <div className="flex pb-4 space-x-16 space-y-8 text-gray-400">
                    <label
                      htmlFor="movies"
                      onClick={handleMovieMedia}
                      className={`flex flex-col items-center justify-end space-y-2 cursor-pointer ${
                        movieLibrary && "text-[#CC7B19] font-semibold"
                      }`}
                    >
                      <BsFilm className="text-4xl" />
                      <p>Movies</p>
                    </label>
                    <input
                      type="radio"
                      id="movies"
                      name="media"
                      value="movies"
                      defaultChecked
                      className="hidden"
                    />

                    <input
                      type="radio"
                      id="tv"
                      name="media"
                      value="tv"
                      className="hidden"
                    />
                    <label
                      htmlFor="tv"
                      onClick={handleTvMedia}
                      className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                        tvLibrary && "text-[#CC7B19] font-semibold"
                      }`}
                    >
                      <MdMonitor className="text-4xl" />
                      <p className="inline-block w-[90px]">TV Shows</p>
                    </label>

                    <input
                      type="radio"
                      id="music"
                      name="media"
                      value="music"
                      className="hidden"
                    />
                    <label
                      htmlFor="music"
                      className={`flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                        musicLibrary && "text-[#CC7B19] font-semibold"
                      }`}
                    >
                      <HiOutlineMusicNote className="text-4xl" />
                      <p>Music</p>
                    </label>
                  </div>
                </div>
                {/* add folders section */}
                {folderLoadSection && (
                  <div className="pb-4 space-y-2">
                    <p>Add folders to your library</p>
                    <input
                      className="mr-2 bg-gray-800 rounded-xl"
                      ref={folderPickerRef}
                      type="file"
                      {...({ directory: "", webkitdirectory: "" } as any)}
                      onChange={addFolderUrl}
                      hidden
                    />
                    <button
                      onClick={() => folderPickerRef.current?.click()}
                      className="p-2 bg-gray-600 rounded-lg"
                      disabled={isProcessing || isSaving}
                    >
                      {isSaving
                        ? "SAVING TO COLLECTION..."
                        : isProcessing
                        ? `PROCESSING... (${processedCount}/${totalFiles})`
                        : "SELECT FOLDER"}
                    </button>

                    {isProcessing && (
                      <div className="mt-4 space-y-2 pr-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">
                            Processing files...
                          </span>
                          <span className="text-gray-400">
                            {processedCount}/{totalFiles}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#CC7B19] h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(processedCount / totalFiles) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400">
                          Please wait while we fetch movie data from TMDB. This
                          may take a moment.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {/* advanced section */}
                <div></div>
              </div>
            </div>
            <div className="flex items-center justify-end py-2 pr-4 space-x-4 bg-gray-800">
              {/* modal buttons */}
              <button
                className="p-2 bg-gray-700 rounded-md"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className={`p-2 rounded-md ${
                  ok ? "bg-gray-900" : "bg-red-700"
                }`}
              >
                OK
              </button>
            </div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
        </div>
      </Activity>
    </>
  );
}

export default MediaModal;
