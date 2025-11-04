interface MediaItemData {
  id: string
  name: string
  tmdbId: number
  adult?: boolean
  backdrop_path: string
  lang: string
  popularity: number
  voteAverage: number
  voteCount: number
  tmdbPoster: string
  tmdbTitle: string
  tmdbOverview: string
  tmdbReleaseDate: string
  tmdbRating: number
  tmdbGenre: string[]
  tmdbProduction?: string
  fileName: string
  ObjUrl: string
  folderPath: string
  folderPath2: string
  rootPath: string
}

let MediaItemProps: Partial<MediaItemData> = {}

export default MediaItemProps
