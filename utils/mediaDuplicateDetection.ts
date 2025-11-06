import { MovieFile, TvFile } from "../components/props/types";
import { PersistedMovieFile, PersistedTvFile } from "../components/props/PersistedData";

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  action: 'skip' | 'update' | 'add';
  reason: string;
  existingItem?: MovieFile | TvFile;
}

/**
 * Check if a movie file is a duplicate and determine the appropriate action
 */
export function checkMovieDuplicate(
  newMovie: MovieFile,
  existingMovies: (MovieFile | PersistedMovieFile)[]
): DuplicateCheckResult {
  // Find existing movie with same TMDB ID
  const existingMovie = existingMovies.find(m => m.tmdbId === newMovie.tmdbId);

  if (!existingMovie) {
    return {
      isDuplicate: false,
      action: 'add',
      reason: 'New movie not in collection'
    };
  }

  // Same TMDB ID found - check if it's the same file or different quality
  const existingSize = existingMovie.fileName ? getFileSizeFromName(existingMovie.fileName) : 0;
  const newSize = newMovie.fileName ? getFileSizeFromName(newMovie.fileName) : 0;

  // If file sizes are significantly different (>10%), consider it an upgrade
  const sizeDifference = Math.abs(newSize - existingSize) / existingSize;
  if (sizeDifference > 0.1) {
    return {
      isDuplicate: true,
      action: 'update',
      reason: `Better quality version found (${newSize > existingSize ? 'larger' : 'smaller'} file)`,
      existingItem: existingMovie
    };
  }

  // Same movie, similar size - consider it a duplicate
  return {
    isDuplicate: true,
    action: 'skip',
    reason: 'Movie already exists with similar quality',
    existingItem: existingMovie
  };
}

/**
 * Check if a TV episode is a duplicate and determine the appropriate action
 */
export function checkTvEpisodeDuplicate(
  newEpisode: TvFile,
  existingEpisodes: (TvFile | PersistedTvFile)[]
): DuplicateCheckResult {
  // Find existing episode with same TMDB ID, season, and episode
  const existingEpisode = existingEpisodes.find(tv =>
    tv.tmdbId === newEpisode.tmdbId &&
    tv.seasonNumber === newEpisode.seasonNumber &&
    tv.episodeNumber === newEpisode.episodeNumber
  );

  if (existingEpisode) {
    // Same episode exists - check quality
    const existingSize = existingEpisode.fileName ? getFileSizeFromName(existingEpisode.fileName) : 0;
    const newSize = newEpisode.fileName ? getFileSizeFromName(newEpisode.fileName) : 0;

    const sizeDifference = Math.abs(newSize - existingSize) / existingSize;
    if (sizeDifference > 0.1) {
      return {
        isDuplicate: true,
        action: 'update',
        reason: `Better quality episode found (${newSize > existingSize ? 'larger' : 'smaller'} file)`,
        existingItem: existingEpisode
      };
    }

    return {
      isDuplicate: true,
      action: 'skip',
      reason: 'Episode already exists with similar quality',
      existingItem: existingEpisode
    };
  }

  // Check if this is part of an existing series (missing episode)
  const existingSeries = existingEpisodes.find(tv => tv.tmdbId === newEpisode.tmdbId);
  if (existingSeries) {
    return {
      isDuplicate: false,
      action: 'add',
      reason: `Missing episode ${newEpisode.seasonNumber}x${newEpisode.episodeNumber} for existing series "${existingSeries.name}"`
    };
  }

  // Completely new series
  return {
    isDuplicate: false,
    action: 'add',
    reason: 'New TV series episode'
  };
}

/**
 * Extract approximate file size from filename (basic heuristic)
 * Returns size in MB, or 0 if unable to determine
 */
function getFileSizeFromName(fileName: string): number {
  // Look for size patterns like "1.2GB", "800MB", "500MB", etc.
  const gbMatch = fileName.match(/(\d+(?:\.\d+)?)\s*GB/i);
  if (gbMatch) {
    return parseFloat(gbMatch[1]) * 1024; // Convert GB to MB
  }

  const mbMatch = fileName.match(/(\d+(?:\.\d+)?)\s*MB/i);
  if (mbMatch) {
    return parseFloat(mbMatch[1]);
  }

  // Look for resolution-based size estimation
  if (fileName.includes('2160p') || fileName.includes('4K')) {
    return 8000; // Rough estimate for 4K
  }
  if (fileName.includes('1080p')) {
    return 2000; // Rough estimate for 1080p
  }
  if (fileName.includes('720p')) {
    return 1000; // Rough estimate for 720p
  }

  return 0; // Unable to determine
}

/**
 * Get quality ranking for comparison (higher is better)
 */
export function getQualityRank(fileName: string): number {
  const name = fileName.toLowerCase();

  // Resolution ranking (higher resolution = higher rank)
  if (name.includes('2160p') || name.includes('4k')) return 4;
  if (name.includes('1080p')) return 3;
  if (name.includes('720p')) return 2;
  if (name.includes('480p')) return 1;

  return 0; // Unknown resolution
}

/**
 * Determine if new file is better quality than existing
 */
export function isBetterQuality(newFileName: string, existingFileName: string): boolean {
  return getQualityRank(newFileName) > getQualityRank(existingFileName);
}
