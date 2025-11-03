import { parseSync, stringifySync } from 'subtitle';

// Common subtitle file extensions
export const SUBTITLE_EXTENSIONS = ['.srt', '.vtt', '.ass', '.ssa', '.sub'];

export interface SubtitleFile {
  fileName: string;
  filePath: string;
  language?: string;
  format: string;
  size: number;
}

export interface ParsedSubtitle {
  file: SubtitleFile;
  content: string;
  cues: any[];
}

/**
 * Detects subtitle files in the same directory as a video file
 * @param videoPath - Path to the video file
 * @returns Promise<SubtitleFile[]> - Array of detected subtitle files
 */
export async function detectSubtitleFiles(videoPath: string): Promise<SubtitleFile[]> {
  if (!videoPath) return [];

  try {
    // TODO: Implement actual subtitle file detection
    // Currently returning empty array as we need backend API support to scan directories
    // For now, subtitle files would need to be manually provided or loaded from a known location

    console.log('Subtitle detection requested for:', videoPath);
    console.log('Note: Automatic subtitle detection requires backend API support to scan directories');

    return [];

  } catch (error) {
    console.error('Error detecting subtitle files:', error);
    return [];
  }
}

/**
 * Parses subtitle content and converts to VTT format
 * @param content - Raw subtitle file content
 * @param format - Original format (srt, vtt, ass, etc.)
 * @returns ParsedSubtitle - Parsed subtitle data
 */
export function parseSubtitleContent(content: string, format: string): ParsedSubtitle | null {
  try {
    // If it's already VTT, no conversion needed
    if (format.toLowerCase() === 'vtt') {
      return {
        file: {
          fileName: '',
          filePath: '',
          format: 'vtt',
          size: content.length
        },
        content: content,
        cues: parseSync(content)
      };
    }

    // Parse SRT and convert to VTT
    if (format.toLowerCase() === 'srt') {
      const nodes = parseSync(content);
      const vttContent = stringifySync(nodes, { format: 'WebVTT' });

      return {
        file: {
          fileName: '',
          filePath: '',
          format: 'vtt',
          size: vttContent.length
        },
        content: vttContent,
        cues: nodes
      };
    }

    // For ASS/SSA formats, we'd need additional parsing
    // For now, return null for unsupported formats
    console.warn(`Unsupported subtitle format: ${format}`);
    return null;

  } catch (error) {
    console.error('Error parsing subtitle content:', error);
    return null;
  }
}

/**
 * Extracts language code from subtitle filename
 * @param fileName - Subtitle filename
 * @returns string - Language code (e.g., 'en', 'es', 'fr')
 */
export function extractLanguageFromFileName(fileName: string): string | undefined {
  const lowerFileName = fileName.toLowerCase();

  // Common language patterns
  const languagePatterns: { [key: string]: string } = {
    'en': 'en',
    'eng': 'en',
    'english': 'en',
    'es': 'es',
    'spa': 'es',
    'spanish': 'es',
    'fr': 'fr',
    'fre': 'fr',
    'french': 'fr',
    'de': 'de',
    'ger': 'de',
    'german': 'de',
    'it': 'it',
    'ita': 'it',
    'italian': 'it',
    'pt': 'pt',
    'por': 'pt',
    'portuguese': 'pt',
    'ru': 'ru',
    'rus': 'ru',
    'russian': 'ru',
    'ja': 'ja',
    'jpn': 'ja',
    'japanese': 'ja',
    'ko': 'ko',
    'kor': 'ko',
    'korean': 'ko',
    'zh': 'zh',
    'chi': 'zh',
    'chinese': 'zh'
  };

  for (const [pattern, lang] of Object.entries(languagePatterns)) {
    if (lowerFileName.includes(`.${pattern}.`) || lowerFileName.endsWith(`.${pattern}`)) {
      return lang;
    }
  }

  return undefined;
}

/**
 * Gets language name from language code
 * @param langCode - Language code (e.g., 'en', 'es')
 * @returns string - Full language name
 */
export function getLanguageName(langCode: string): string {
  const languages: { [key: string]: string } = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano',
    'pt': 'Português',
    'ru': 'Русский',
    'ja': '日本語',
    'ko': '한국어',
    'zh': '中文'
  };

  return languages[langCode] || langCode.toUpperCase();
}
