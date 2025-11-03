import { useState, useEffect, useCallback } from 'react';

export interface SubtitleTrack {
  id: string;
  label: string;
  language: string;
  src: string;
  kind: 'subtitles' | 'captions';
  default?: boolean;
}

export interface UseSubtitlesReturn {
  subtitleTracks: SubtitleTrack[];
  selectedTrack: string | null;
  isLoading: boolean;
  error: string | null;
  loadSubtitles: (videoPath: string) => Promise<void>;
  selectTrack: (trackId: string | null) => void;
  toggleSubtitles: () => void;
  subtitlesEnabled: boolean;
}

/**
 * Custom hook for managing subtitle loading and selection
 */
export function useSubtitles(): UseSubtitlesReturn {
  const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrack[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  /**
   * Loads subtitle files for a given video path
   */
  const loadSubtitles = useCallback(async (videoPath: string) => {
    if (!videoPath) {
      setSubtitleTracks([]);
      setSelectedTrack(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // For now, we'll create a demo subtitle track
      // In a real implementation, this would scan for subtitle files
      const demoTrack: SubtitleTrack = {
        id: 'demo-en',
        label: 'English (Demo)',
        language: 'en',
        src: '', // Empty for demo - would be a real VTT URL
        kind: 'subtitles',
        default: true
      };

      setSubtitleTracks([demoTrack]);
      setSelectedTrack('demo-en');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load subtitles';
      setError(errorMessage);
      console.error('Subtitle loading error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Selects a subtitle track
   */
  const selectTrack = useCallback((trackId: string | null) => {
    setSelectedTrack(trackId);
  }, []);

  /**
   * Toggles subtitles on/off
   */
  const toggleSubtitles = useCallback(() => {
    setSubtitlesEnabled(prev => !prev);
  }, []);

  // Cleanup blob URLs when component unmounts or tracks change
  useEffect(() => {
    return () => {
      subtitleTracks.forEach(track => {
        if (track.src.startsWith('blob:')) {
          URL.revokeObjectURL(track.src);
        }
      });
    };
  }, [subtitleTracks]);

  return {
    subtitleTracks,
    selectedTrack,
    isLoading,
    error,
    loadSubtitles,
    selectTrack,
    toggleSubtitles,
    subtitlesEnabled
  };
}
