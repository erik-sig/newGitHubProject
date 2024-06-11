import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GetUserReposResponse } from '@/api/get-user-repos'

import { UserRepoLanguage } from './user-repo-language'

export function RepositorieCard({
  repoData,
}: {
  repoData: GetUserReposResponse
}) {
  return (
    <Link to={`repo/${repoData.id}`}>
      <div className="relative flex flex-col py-5 px-8 bg-primary-foreground dark:border-none border-border border-2 h-64 rounded-lg hover:scale-105 duration-100">
        <div className="flex justify-between items-baseline mb-5 gap-2">
          <h2 className="text-foreground text-2xl font-semibold ">
            {repoData.name}
          </h2>
          <span className="font-semibold text-muted-foreground text-sm ">
            {formatDistanceToNowStrict(repoData.created_at, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-5">
          {!repoData.description && (
            <span className="italic">Sem nenhuma descrição...</span>
          )}
          {repoData.description}
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-between absolute items-center bottom-5 left-8 gap-5 text-foreground font-semibold">
            <div className="flex items-center gap-2">
              <UserRepoLanguage language={repoData.language} />
              {repoData.language}
            </div>
            <div className="flex gap-1">
              <Star />
              {repoData.stargazers_count}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
