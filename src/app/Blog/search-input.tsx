'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

interface SearchInputProps {
  postsLength: number
  onSearch: (query: string) => void
}
export function SearchInput({ postsLength, onSearch }: SearchInputProps) {
  const { register, watch } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const query = watch('query')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query || '')
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="mt-18 mb-12 w-full">
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-lg leading-[160%] font-bold text-slate-200">
          Publicações
        </h3>
        <span className="text-sm text-slate-400">
          {postsLength} {postsLength === 1 ? 'publicação' : 'publicações'}
        </span>
      </header>
      <input
        className="durantion-300 w-full rounded-md border-0 bg-neutral-950 px-4 py-3 text-slate-300 placeholder-slate-600 shadow-sm transition-all outline-none focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-400"
        type="text"
        placeholder="Buscar conteúdo"
        {...register('query')}
      />
    </div>
  )
}
