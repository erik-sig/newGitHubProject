import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Github, SquareArrowOutUpRight, Star } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { getUserRepos } from '@/api/get-user-repos'

import { UserRepoLanguage } from '../profile/user-repo-language'

export function RepositoryPage() {
  const { queryUser, repoId } = useParams()
  const repoIdNumber = Number(repoId)

  const { data: repos } = useQuery({
    queryKey: ['userRepos', queryUser],
    queryFn: () => getUserRepos({ username: queryUser }),
    enabled: !!queryUser,
    staleTime: Infinity,
  })

  const repo = repos?.filter((repo) => repo.id === repoIdNumber)
  if (!repo) return
  const repoData = repo[0]

  return (
    <>
      <Helmet title="Repository" />
      <main className="max-w-screen-lg m-auto p-10">
        <div className="w-full md:h-60 bg-primary-foreground rounded-2xl dark:border-none border-border border-2 flex  gap-10 mt-20 p-10 mb-20">
          <div className="flex flex-col items-start w-full">
            <div className="flex justify-between items-start w-full flex-col md:flex-row md:items-center gap-2 md:gap-0">
              <h1 className="text-3xl text-foreground font-semibold">
                {repoData.name}
              </h1>
              <span className="text-primary flex gap-2 items-center font-bold">
                VER NO GITHUB{' '}
                <a
                  href={repoData.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 duration 100"
                >
                  <SquareArrowOutUpRight />
                </a>
              </span>
            </div>
            <p className="flex-1 mt-2 text-lg text-muted-foreground line-clamp-3">
              {repoData.description === null ? (
                <span className="italic">Sem nenhuma descrição...</span>
              ) : (
                repoData.description
              )}
            </p>
            <div className=" w-full flex items-start justify-start gap-5 mt-10 md:mt-0 md:gap-10 flex-col md:flex-row">
              <div className="flex gap-2 text-foreground font-medium">
                <Github /> {repoData.owner.login}
              </div>
              <div className="flex gap-2 text-foreground font-medium">
                <Calendar />
                {formatDistanceToNowStrict(repoData.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <UserRepoLanguage language={repoData.language} />
                  {repoData.language}
                </div>
              </div>
              <div className="flex gap-1">
                <Star />
                {repoData.stargazers_count}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
