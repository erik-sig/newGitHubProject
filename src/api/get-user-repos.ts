import { api } from '@/lib/axios'
import { LanguageType } from '@/pages/app/profile/user-repo-language'

interface GetUserProps {
  username: string | undefined
  repoId?: number | undefined
}

export type GetUserReposResponse = {
  id: number
  name: string
  description: string
  url: string
  language: LanguageType
  created_at: Date
  stargazers_count: number
  owner: {
    login: string
  }
}
export async function getUserRepos({ username, repoId }: GetUserProps) {
  const response = await api.get<GetUserReposResponse[] | undefined>(
    `/${username}/repos`,
  )
  // const dateSortedArray: string[] = []

  // response.data?.map((repo) => dateSortedArray.push(repo.created_at))
  // // console.log(response.data.sort(compareAsc))

  if (repoId) return response.data?.filter((repo) => repo.id === repoId)
  else return response.data
}
