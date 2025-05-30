'use client'

import { fetchPosts, IPost } from '@/services/github'
import { Profile } from './Blog/profile'
import { SearchInput } from './Blog/search-input'
import { PostCardSkeleton } from './Blog/post-card-skeleton'
import { useEffect, useState } from 'react'
import { PostCard } from './Blog/post-card'

export default function HomePage({ initialPosts }: { initialPosts: IPost[] }) {
  const [posts, setPosts] = useState<IPost[]>(initialPosts)
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true)
        const data = await fetchPosts()
        setPosts(data)
        setFilteredPosts(data)
      } catch (error) {
        console.error('Failed to load posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPosts(posts)
      return
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredPosts(filtered)
  }

  return (
    <div className="flex flex-col items-center">
      <Profile />
      <SearchInput onSearch={handleSearch} postsLength={filteredPosts.length} />
      <div className="grid w-full grid-cols-2 gap-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.number} post={post} />
          ))
        ) : (
          <div className="col-span-2 py-8 text-center">
            <p className="text-slate-400">
              {posts.length === 0
                ? 'Nenhum post encontrado no repositório'
                : 'Nenhum resultado correspondente à sua pesquisa'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
