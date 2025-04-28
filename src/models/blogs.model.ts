export interface BlogInputModel {
  name: string,
  description: string,
  websiteUrl: string
}

export interface BlogViewModel {
  name: string,
  description: string,
  websiteUrl: string,
  createdAt: string,
  isMembership: boolean
}
