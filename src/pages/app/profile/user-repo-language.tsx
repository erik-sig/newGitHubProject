export type LanguageType =
  | 'TypeScript'
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'Python'
  | 'Java'
  | 'Todas'
  | string

interface UserRepoLanguageProps {
  language: LanguageType | null
}
const languageArray = [
  'TypeScript',
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Java',
]
export function UserRepoLanguage({ language }: UserRepoLanguageProps) {
  return (
    <>
      {language === 'JavaScript' && (
        <div className="size-2 rounded-full bg-yellow-300"></div>
      )}
      {language === 'CSS' && (
        <div className="size-2 rounded-full bg-violet-500"></div>
      )}
      {language === 'HTML' && (
        <div className="size-2 rounded-full bg-orange-700"></div>
      )}
      {language === 'Python' && (
        <div className="size-2 rounded-full bg-blue-500"></div>
      )}
      {language === 'Java' && (
        <div className="size-2 rounded-full bg-amber-600"></div>
      )}
      {language === 'TypeScript' && (
        <div className="size-2 rounded-full bg-blue-700"></div>
      )}
      {language === null && <div>Nenhuma linguagem</div>}
      {language !== null && !languageArray.includes(language as string) && (
        <div className="size-2 rounded-full bg-slate-500"></div>
      )}
    </>
  )
}
