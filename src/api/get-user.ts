import { api } from '@/lib/axios'

interface GetUserProps {
  username: string | undefined
}

export interface GetUserResponse {
  name: string
  bio: string
  html_url: string
  public_repos: number
  company: string
  login: string
  followers: number
  avatar_url: string
}
export async function getUser({ username }: GetUserProps) {
  const response = await api.get<GetUserResponse | undefined>(`/${username}`)
  return response.data
}
