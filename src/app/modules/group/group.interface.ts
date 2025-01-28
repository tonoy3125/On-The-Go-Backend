export type GroupPrivacy = 'public' | 'private'

export type TGroup = {
  name: string
  description: string
  image: string
  privacy: GroupPrivacy
}
