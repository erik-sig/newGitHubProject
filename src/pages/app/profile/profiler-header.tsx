import { Github, Hotel, SquareArrowOutUpRight, UsersRound } from 'lucide-react'

import { GetUserResponse } from '@/api/get-user'

export function ProfileHeader({ userData }: { userData: GetUserResponse }) {
  return (
    <div className="w-full  md:h-60 bg-primary-foreground rounded-2xl dark:border-none border-border border-2 md:flex-row flex flex-col gap-10 -mt-14 p-6 md:p-10 mb-20">
      <img
        src={userData.avatar_url}
        alt="Avatar"
        className="size-40 rounded-lg hidden md:block"
      />
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-5 md:gap-0">
          <h1 className="text-3xl text-foreground text-center font-semibold">
            {userData.name}
          </h1>
          <span className="text-primary flex gap-2 items-center font-bold">
            GITHUB{' '}
            <a
              href={userData.html_url}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 duration 100"
            >
              <SquareArrowOutUpRight />
            </a>
          </span>
        </div>
        <p className="flex-1 mt-2 text-lg text-muted-foreground line-clamp-3 hidden md:flex">
          {userData.bio}
        </p>
        <div className=" w-full flex mt-10 md:mt-0 items-center justify-center gap-5 md:gap-10 md:justify-start flex-col md:flex-row">
          <div className="flex gap-2 text-foreground font-medium">
            <Github /> {userData.login}
          </div>
          <div className="flex gap-2 text-foreground font-medium">
            <Hotel />
            {userData.company === null ? (
              <span>Nenhuma empresa</span>
            ) : (
              <span>{userData.company}</span>
            )}
          </div>
          <div className="flex gap-2 text-foreground font-medium">
            <UsersRound />
            {userData.followers}
          </div>
        </div>
      </div>
    </div>
  )
}
