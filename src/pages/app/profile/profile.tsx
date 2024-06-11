import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { compareAsc, compareDesc } from 'date-fns'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getUser } from '@/api/get-user'
import { getUserRepos } from '@/api/get-user-repos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import { ProfileSkeleton } from './profile-skeleton'
import { ProfileHeader } from './profiler-header'
import { RepositorieCard } from './repositorie-card'

const filterSchema = z.object({
  repoName: z.string().optional(),
  repoLanguage: z.string().optional(),
  repoSort: z.string().optional(),
})

type FilterSchema = z.infer<typeof filterSchema>

export function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { queryUser } = useParams()

  const repoName = searchParams.get('repoName')?.toUpperCase()
  const repoLanguage = searchParams.get('repoLanguage')
  const repoSort = searchParams.get('repoSort')

  const { register, handleSubmit, control } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      repoName: repoName ?? '',
      repoLanguage: repoLanguage ?? 'Todas',
      repoSort: repoSort ?? 'asc',
    },
  })

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', queryUser],
    queryFn: () => getUser({ username: queryUser }),
    enabled: !!queryUser,
    staleTime: Infinity,
  })

  console.log(isLoadingUser)

  const { data: repos, isLoading: isLoadingRepos } = useQuery({
    queryKey: ['userRepos', queryUser],
    queryFn: () => getUserRepos({ username: queryUser }),
    enabled: !!queryUser,
    staleTime: Infinity,
  })

  // select all languages from use repos
  const selectLanguage: string[] = []
  repos?.map((repo) => {
    if (!selectLanguage.includes(repo.language)) {
      selectLanguage.push(repo.language)
      return repo.language
    } else return null
  })
  selectLanguage.push('Todas')
  const filteredSelectLanguage = selectLanguage.filter(
    (language) => language !== null,
  )

  function handleFilters({ repoName, repoLanguage, repoSort }: FilterSchema) {
    console.log(repoName, repoLanguage, repoSort)
    setSearchParams((state) => {
      if (repoName) state.set('repoName', repoName)
      else state.delete('repoName')

      if (repoLanguage && repoLanguage !== 'Todas')
        state.set('repoLanguage', repoLanguage)
      else state.delete('repoLanguage')

      if (repoSort) state.set('repoSort', repoSort)
      else state.delete('repoSort')

      return state
    })
  }
  // apply all filters
  let filteredRepos = repos

  if (repoLanguage)
    filteredRepos = filteredRepos?.filter(
      (repo) => repoLanguage === repo.language,
    )
  if (repoName)
    filteredRepos = filteredRepos?.filter((repo) => {
      const searchedName = repoName.toLowerCase().trim()
      const nameToFind = repo.name.toLowerCase().trim()
      console.log(searchedName, nameToFind)
      if (nameToFind.includes(searchedName)) return repo
      console.log(nameToFind.includes(searchedName))
      return searchedName.includes(nameToFind)
    })
  console.log(filteredRepos)
  if (repoSort === 'asc') {
    filteredRepos?.sort((date1, date2) => {
      return compareAsc(date2.created_at, date1.created_at)
    })
  } else {
    filteredRepos?.sort((date1, date2) => {
      return compareDesc(date2.created_at, date1.created_at)
    })
  }
  console.log(filteredRepos)
  return (
    <>
      <Helmet title="Profile" />
      <header className="bg-background h-72 w-full bg-cover flex items-center justify-center text-4xl md:text-5xl font-bold tracking-wider">
        GITHUB<span className="text-primary animate-pulse">{'  '}FINDER</span>
      </header>
      {!isLoadingUser ? (
        <main className="max-w-screen-lg m-auto p-10">
          {user && <ProfileHeader userData={user} />}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex justify-between">
              <h2 className="text-muted-foreground font-semibold text-xl">
                Repositórios
              </h2>
              <span className="text-muted-foreground font-semibold">
                {user?.public_repos} repositórios
              </span>
            </div>
            <form
              onSubmit={handleSubmit(handleFilters)}
              className="flex gap-4 flex-col md:flex-row"
            >
              <Input
                {...register('repoName')}
                className="text-lg"
                placeholder="Buscar repositório..."
              />

              <div className="flex items-center gap-2">
                Filtro:
                <Controller
                  name="repoLanguage"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => (
                    <Select
                      defaultValue=""
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                      dir="ltr"
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Linguagem" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSelectLanguage.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name="repoSort"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => (
                    <Select
                      defaultValue="asc"
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                      dir="ltr"
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Decrescente</SelectItem>
                        <SelectItem value="asc">Crescente</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <Button type="submit">Buscar</Button>
            </form>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {isLoadingRepos ? (
              <>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </>
            ) : repos && filteredRepos && filteredRepos?.length > 0 ? (
              filteredRepos?.map((repo) => (
                <RepositorieCard repoData={repo} key={repo.id} />
              ))
            ) : (
              repos &&
              repos.map((repo) => (
                <RepositorieCard repoData={repo} key={repo.id} />
              ))
            )}
          </div>
        </main>
      ) : (
        <ProfileSkeleton />
      )}
    </>
  )
}
