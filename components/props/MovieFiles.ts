interface MovieFile {
  name: string
  tmdbId: number
  adult: boolean
  backdrop_path: string
  original_language: string
  popularity: number
  vote_average: number
  vote_count: number
  tmdbPoster: string
  tmdbTitle: string
  tmdbOverview: string
  tmdbReleaseDate: string
  tmdbRating: number
  tmdbGenre: string[]
  fileName: string
  ObjUrl: string
  folderPath: string
  folderPath2: string
  rootPath: string
  fileId?: string
}

const MovieFiles: MovieFile[] = []

export default MovieFiles
