export interface MediaCredit {
  key: number
  id: number // TMDB person ID
  name: string
  character: string
  profile_path: string
  dep: string
}

const MediaCredits: MediaCredit[] = []

export default MediaCredits
