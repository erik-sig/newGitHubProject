import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getUser } from '@/api/get-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const queryFormSchema = z.object({
  queryUser: z.string().min(1, { message: 'Digite algum usuário.' }).max(30),
})

type QueryFormSchema = z.infer<typeof queryFormSchema>
export function SearchPage() {
  const [loading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<QueryFormSchema>({
    resolver: zodResolver(queryFormSchema),
  })

  async function handleQuerySubmit(data: QueryFormSchema) {
    setIsLoading(true)
    try {
      const response = await getUser({ username: data.queryUser })
      console.log(response)
      navigate(`profile/${data.queryUser}`)
    } catch (error) {
      toast.error('Usuário não encontrado', {
        className: 'h-20 text-2xl',
      })
    } finally {
      setIsLoading(false)
      reset()
    }
  }
  return (
    <>
      <Helmet title="Search" />

      <main className="min-h-screen flex flex-col items-center ">
        <h1 className="text-4xl text-foreground font-bold tracking-wider text-center mt-40 mb-40 animate-pulse md:text-8xl">
          GITHUB
          <span className="text-primary">FINDER</span>
        </h1>
        <form
          onSubmit={handleSubmit(handleQuerySubmit)}
          className="w-8/12 flex flex-col items-start gap-2"
        >
          <div className="w-full flex flex-col items-end gap-5 md:flex-row">
            <Input
              {...register('queryUser')}
              className="w-full md:h-20 md:text-4xl font-semibold"
              type="text"
              id="search"
              placeholder="Busque por um usuário..."
            />

            {loading ? (
              <Button
                type="submit"
                className="w-1/3 h-10 m-auto md:text-2xl shadow-2xl shadow-foreground/10 md:h-20"
              >
                <Loader2 className="animate-spin" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-1/3 h-10 m-auto md:text-2xl shadow-2xl shadow-foreground/10 md:h-20"
              >
                Buscar
              </Button>
            )}
          </div>
          <span className="text-destructive text-xl font-semibold">
            {errors.queryUser?.message}
          </span>
        </form>
      </main>
    </>
  )
}
