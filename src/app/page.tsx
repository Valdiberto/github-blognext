import { fetchPosts } from '@/services/github'
import HomePage from './HomePage'

export default async function Home() {
  const initialPosts = await fetchPosts()
  return <HomePage initialPosts={initialPosts} />
}
