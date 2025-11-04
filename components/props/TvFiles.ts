interface TvFile {
  name: string
  episode?: any
  tmdbId: number
  adult?: boolean
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
}

const TvFiles: TvFile[] = []

export default TvFiles
